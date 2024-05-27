const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
const {Client} = require('pg');
dotenv.config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true, // Permite incluir cookies en las solicitudes
  }));

app.use(cookieParser());
app.use((req, res, next) => {
    // Setear la cookie solo si no está presente
    if (!req.cookies.guestCartId) {
        const newGuestCartId = Math.random().toString(36).substring(2, 15); // Generar un nuevo identificador de carrito de usuario no registrado
        res.cookie('guestCartId', newGuestCartId, { httpOnly: true, secure: true }); // Asegurar que la cookie solo sea accesible por HTTP y en conexiones seguras
    }
    next();
});

const port = 4000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "Nexus"
});

client.connect()
    .then(() => console.log("Conexión exitosa a PostgreSQL"))
    .catch(err => console.error('Error de conexión a PostgreSQL', err))

app.get('/', (req, res) => {
    res.send('¡conexión exitosa!');
});

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena } = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, errors: 'correo ya registrado' });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        await client.query('INSERT INTO usuario (nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellido, correo, telefono, id, fecha_nacimiento,contrasena]);

        const newUser = await client.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
        const user = newUser.rows[0];
        if (!user) {
            return res.status(400).json({ success: false, errors: 'No se pudo crear el usuario' });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        console.log("Generated token:", token); // Imprimir el token aquí
        // Aquí se obtiene o genera el userCartId
        const userCartId = req.cookies.userCartId || Math.random().toString(36).substring(2, 15);
        console.log('usercadid',userCartId);

        // Se asocia el userCartId al usuario
        await client.query('UPDATE usuario SET cart_id = $1 WHERE id = $2', [userCartId, user.id]);
        console.log(userCartId);

        res.json({ success: true, token });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

app.post('/signin', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1 AND contrasena=$2', [correo, contrasena]);
        if (existingUser.rows.length === 0) {
            return res.json({ success: false, errors: "Usuario o contraseña incorrectos" });
        }

        const data = { user: { id: existingUser.rows[0].id } };
        const token = jwt.sign(data, 'secret_ecom');
        // Obtener el userCartId asociado al usuario que inició sesión
        const userCartId = await obtenerUserCart(existingUser.rows[0].id);
        console.log(userCartId);
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).json({ error: 'Error al verificar el usuario' });
    }
});

const obtenerUserCart = async (userId) => {
    try {
        const result = await client.query('SELECT cart_id FROM usuario WHERE id = $1', [userId]);
        if (result.rows.length > 0) {
            return result.rows[0].cart_id;
        } else {
            // Si no se encuentra un userCartId asociado al usuario, se puede generar uno nuevo
            const newUserCartId = Math.random().toString(36).substring(2, 15);
            await client.query('UPDATE usuario SET cart_id = $1 WHERE id = $2', [newUserCartId, userId]);
            return newUserCartId;
        }
    } catch (error) {
        console.error('Error al obtener userCartId:', error);
        // Manejar el error adecuadamente, ya sea lanzando una excepción o devolviendo un valor predeterminado
        return null;
    }
};



const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static("upload/images"))

app.post("/upload", upload.array('image', 4), (req, res) => {
    if (!req.files || req.files.length !== 4) {
        return res.status(400).json({ error: 'Se requieren 4 archivos de imagen' });
    }
    const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
    const reversedUrls = imageUrls.reverse(); // Revertir el array de URLs
    res.json({
        success: 1,
        image_urls: reversedUrls
    });
});

// Modificar la inserción de productos de ropa
app.post('/addproduct', async (req, res) => {
    const { name, category, new_price, old_price, description, image_urls, tallas } = req.body;

    // Validar que haya exactamente 4 URLs de imagen
    if (image_urls.length !== 4) {
        return res.status(400).json({ error: 'Se requieren exactamente 4 URLs de imagen' });
    }

    try {
        const products = await client.query('SELECT * FROM product');
        let id;
        if (products.rows.length > 0) {
            let lastproduct = products.rows[products.rows.length - 1];
            id = lastproduct.id + 1;
        } else {
            id = 1;
        }

        // Insertar el producto en la tabla product
        await client.query('INSERT INTO product (id, name, category, new_price, old_price, description) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, category, new_price, old_price, description]);
        console.log("Saved product with ID:", id);

        // Insertar las URLs de las imágenes en la tabla product_image
        for (let i = 0; i < image_urls.length; i++) {
            await client.query('INSERT INTO product_image (product_id, image_url) VALUES ($1, $2)', [id, image_urls[i]]);
            console.log("Saved image URL:", image_urls[i]);
        }

        // Insertar las tallas de ropa en la tabla talla_ropa
        if (category === 'Ropa') {
            for (let i = 0; i < tallas.length; i++) {
                await client.query('INSERT INTO talla_ropa (product_id, talla) VALUES ($1, $2)', [id, tallas[i]]);
                console.log("Saved talla:", tallas[i]);
            }
        }

        res.json({
            success: true,
            name: name
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

// Modificar la obtención de productos de ropa
app.get('/ropa', async (req, res) => {
    try {
        const products = await client.query('SELECT p.id, p.name, p.category, p.new_price, p.old_price, p.description, COALESCE(array_agg(pi.image_url), ARRAY[]::text[]) AS image_urls, COALESCE(array_agg(tr.talla), ARRAY[]::text[]) AS tallas FROM product p LEFT JOIN product_image pi ON p.id = pi.product_id LEFT JOIN talla_ropa tr ON p.id = tr.product_id WHERE p.category = $1 GROUP BY p.id', ['Ropa']);
        console.log("Productos de ropa obtenidos");
        res.send(products.rows);
    } catch (error) {
        console.error('Error al obtener los productos de ropa:', error);
        res.status(500).json({ error: 'Error al obtener los productos de ropa' });
    }
});

// Remove a product by ID
app.post('/removeproduct', async (req, res) => {
    const productId = req.body.id;
    try {
        await client.query('DELETE FROM product WHERE id = $1', [productId]);
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Error removing product' });
    }
});

// necesita cambio
app.put('/editproduct/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, image, category, new_price, old_price, description } = req.body;
    try {
        await client.query('UPDATE product SET name=$1, image=$2, category=$3, new_price=$4, old_price=$5, description=$6 WHERE id=$7', [name, image, category, new_price, old_price, description, productId]);
        console.log("Product Updated");
        res.json({
            success: true,
            name: name
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Get all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await client.query(`
            SELECT 
                p.id, 
                p.name, 
                p.category, 
                p.new_price, 
                p.old_price, 
                p.description, 
                COALESCE(array_agg(DISTINCT pi.image_url), ARRAY[]::text[]) AS image_urls, 
                CASE 
                    WHEN p.category = 'Ropa' THEN COALESCE(array_agg(DISTINCT tr.talla), ARRAY[]::text[]) 
                    ELSE NULL 
                END AS tallas 
            FROM product p 
            LEFT JOIN product_image pi ON p.id = pi.product_id 
            LEFT JOIN talla_ropa tr ON p.id = tr.product_id 
            GROUP BY p.id
        `);
        console.log("All Products Fetched", products.rows);
        res.send(products.rows);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Error fetching all products' });
    }
});






app.get('/newcollections', async (req, res) => {
    try {
        const products = await client.query('SELECT p.id, p.name, p.category, p.new_price, p.old_price, p.description, COALESCE(array_agg(pi.image_url), ARRAY[]::text[]) AS image_urls FROM product p LEFT JOIN product_image pi ON p.id = pi.product_id GROUP BY p.id ORDER BY p.date DESC LIMIT 8');
        console.log("Nuevas colecciones obtenidas");
        res.send(products.rows);
    } catch (error) {
        console.error('Error al obtener nuevas colecciones:', error);
        res.status(500).json({ error: 'Error al obtener nuevas colecciones' });
    }
});


app.get('/popularcollection', async (req, res) => {
    try {
        const products = await client.query('SELECT p.id, p.name, p.category, p.new_price, p.old_price, p.description, COALESCE(array_agg(pi.image_url), ARRAY[]::text[]) AS image_urls FROM product p LEFT JOIN product_image pi ON p.id = pi.product_id WHERE p.category = $1 GROUP BY p.id ORDER BY p.id LIMIT 4', ['Ropa']);
        console.log("Colección popular obtenida");
        res.send(products.rows);
    } catch (error) {
        console.error('Error al obtener la colección popular:', error);
        res.status(500).json({ error: 'Error al obtener la colección popular' });
    }
});

app.get('/relatedproducts/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const products = await client.query('SELECT p.id, p.name, p.category, p.new_price, p.old_price, p.description, COALESCE(array_agg(pi.image_url), ARRAY[]::text[]) AS image_urls FROM product p LEFT JOIN product_image pi ON p.id = pi.product_id WHERE p.category = $1 GROUP BY p.id ORDER BY p.id LIMIT 4', [category]);
        console.log(`Productos relacionados de la categoría ${category} obtenidos`);
        res.send(products.rows);
    } catch (error) {
        console.error(`Error al obtener los productos relacionados de la categoría ${category}:`, error);
        res.status(500).json({ error: `Error al obtener los productos relacionados de la categoría ${category}` });
    }
});




const fetchUser = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, 'secret_ecom');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authenticate using a valid token' });
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;

    console.log('userId:', userId);
    console.log('productId:', productId);
    // Validar que productId no sea nulo o indefinido
    if (!productId) {
        return res.status(400).json({ error: 'El productId es requerido' });
    }
    try {
        const existingCartItem = await client.query('SELECT * FROM user_product WHERE user_id = $1 AND product_id = $2', [userId, productId]);
        if (existingCartItem.rows.length > 0) {
            await client.query('UPDATE user_product SET quantity = quantity + 1 WHERE user_id = $1 AND product_id = $2', [userId, productId]);
        } else {
            await client.query('INSERT INTO user_product (user_id, product_id, quantity) VALUES ($1, $2, 1)', [userId, productId]);
        }
        res.json({ success: true, message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ success: false, error: 'Error adding product to cart' });
    }
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;
    try {
        const existingCartItem = await client.query('SELECT * FROM user_product WHERE user_id = $1 AND product_id = $2', [userId, productId]);
        if (existingCartItem.rows.length > 0) {
            if (existingCartItem.rows[0].quantity > 1) {
                await client.query('UPDATE user_product SET quantity = quantity - 1 WHERE user_id = $1 AND product_id = $2', [userId, productId]);
            } else {
                await client.query('DELETE FROM user_product WHERE user_id = $1 AND product_id = $2', [userId, productId]);
            }
            //res.send("Product removed from cart");
            res.json({ success: true, message: 'Product removed from cart' });
        } else {
            //res.status(404).json({ error: 'Product not found in cart' });
            res.status(500).json({ success: false, error: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Error removing product from cart' });
    }
});

app.post('/getcart', fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const cartItems = await client.query('SELECT p.id, p.name, pi.image_url, p.new_price, up.quantity FROM user_product up JOIN product p ON up.product_id = p.id JOIN product_image pi ON p.id = pi.product_id WHERE up.user_id = $1 AND up.quantity > 0', [userId]);
        console.log("Cart items fetched");
        const formattedCartItems = cartItems.rows.map(item => ({
            id: item.id,
            name: item.name,
            image: item.image_url, // Utiliza image_url en lugar de image
            new_price: item.new_price,
            quantity: item.quantity
        }));
        res.json(formattedCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Error fetching cart items' });
    }
});



const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    const accessToken = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(accessToken, 'secret_ecom');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

app.get('/userinfo', verifyAccessToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const userInfo = await client.query('SELECT * FROM usuario WHERE id = $1', [userId]);
        if (userInfo.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = userInfo.rows[0];
        res.json({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            telefono: user.telefono,
            fecha_nacimiento: user.fecha_nacimiento
        });
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ error: 'Error fetching user information' });
    }
});

app.put('/userinfo', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const { nombre, apellido, correo, telefono } = req.body; // Eliminamos fecha_nacimiento de aquí

    try {
        await client.query('UPDATE usuario SET nombre = $1, apellido = $2, correo = $3, telefono = $4 WHERE id = $5', [nombre, apellido, correo, telefono, userId]); // Eliminamos fecha_nacimiento de aquí
        res.status(200).json({ success: true, message: 'Información del usuario actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la información del usuario:', error);
        res.status(500).json({ success: false, error: 'Error al actualizar la información del usuario' });
    }
});


app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const searchResults = await client.query('SELECT * FROM product WHERE name ILIKE $1', [`%${searchTerm}%`]);
        res.json(searchResults.rows);
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        res.status(500).json({ error: 'Error al realizar la búsqueda' });
    }
});

app.post('/adminsignin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await client.query('SELECT * FROM admin WHERE email=$1 AND password=$2', [email, password]);
        if (admin.rows.length === 0) {
            return res.json({ success: false, errors: "Usuario o contraseña incorrectos" });
        }

        const data = { admin: { id: admin.rows[0].id } };
        const token = jwt.sign(data, 'secret_ecom_admin');
        console.log("Generated token:", token); // Imprimir el token aquí
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error al verificar el admin:', error);
        res.status(500).json({ error: 'Error al verificar el admin' });
    }
});

app.post('/addtocartguest', async (req, res) => {
    const { productId } = req.body;
    const guestCartId = req.headers['guestcartid']; // Accede al guestCartId desde el encabezado
    console.log('guestCartId:', guestCartId);

    // Verificar que productId no sea nulo o indefinido
    if (!productId || !guestCartId) {
        return res.status(400).json({ error: 'El productId y el guestCartId son requeridos' });
    }

    try {
        const existingCartItem = await client.query('SELECT * FROM guest_product WHERE cart_id = $1 AND product_id = $2', [guestCartId, productId]);
        if (existingCartItem.rows.length > 0) {
            await client.query('UPDATE guest_product SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2', [guestCartId, productId]);
        } else {
            await client.query('INSERT INTO guest_product (cart_id, product_id, quantity) VALUES ($1, $2, 1)', [guestCartId, productId]);
        }
        res.json({ success: true, message: 'Product added to guest cart' });
    } catch (error) {
        console.error('Error adding product to guest cart:', error);
        res.status(500).json({ success: false, error: 'Error adding product to guest cart' });
    }
});

app.post('/removefromcartguest', async (req, res) => {
    const { productId } = req.body;
    try {
        // Verificar si el producto está en el carrito del usuario no registrado
        const guestCartId = req.headers['guestcartid'];
        console.log('guestCartId:', guestCartId);
        const cart = await client.query('SELECT * FROM guest_product WHERE cart_id = $1 AND product_id = $2', [guestCartId, productId]);
        if (cart.rows.length > 0) {
            if (cart.rows[0].quantity > 1) {
                await client.query('UPDATE guest_product SET quantity = quantity - 1 WHERE cart_id = $1 AND product_id = $2', [guestCartId, productId]);
            } else {
                await client.query('DELETE FROM guest_product WHERE cart_id = $1 AND product_id = $2', [guestCartId, productId]);
            }
            res.json({ success: true, message: 'Product removed from guest cart' });
        } else {
            res.status(500).json({ success: false, error: 'El producto no está en el carrito' });
        }
    } catch (error) {
        console.error('Error al remover producto del carrito:', error);
        res.status(500).json({ error: 'Error al remover producto del carrito' });
    }
});



app.post('/mergecarts', fetchUser, async (req, res) => {
    const userId = req.user.id;
    const guestCartId = req.headers['guestcartid'];
    //const guestCartId = req.cookies.guestCartId; 

    try {
        // Verificar que el usuario tenga un carrito de invitado antes de fusionar
        if (!guestCartId) {
            return res.status(400).json({ error: 'No se encontró un carrito de invitado para fusionar' });
        }

        const guestCartItems = await client.query('SELECT * FROM guest_product WHERE cart_id = $1', [guestCartId]);
        for (const item of guestCartItems.rows) {
            const existingCartItem = await client.query('SELECT * FROM user_product WHERE user_id = $1 AND product_id = $2', [userId, item.product_id]);
            if (existingCartItem.rows.length > 0) {
                await client.query('UPDATE user_product SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3', [item.quantity, userId, item.product_id]);
            } else {
                await client.query('INSERT INTO user_product (user_id, product_id, quantity) VALUES ($1, $2, $3)', [userId, item.product_id, item.quantity]);
            }
        }

        // Eliminar los productos del carrito de usuario no registrado
        await client.query('DELETE FROM guest_product WHERE cart_id = $1', [guestCartId]);

        res.json({ success: true, message: 'Guest cart merged with user cart' });
    } catch (error) {
        console.error('Error merging guest cart with user cart:', error);
        res.status(500).json({ success: false, error: 'Error merging guest cart with user cart' });
    }
});

app.post("/mercado_pago", async (req,res) => {
    const products = req.body;
    const preference = {
        items:products,
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/fallo",
        },
        
        auto_return: "approved",
    };
    try {
        const respuesta = await mercadopago.preferences.create(preference);
        console.log(respuesta);
        res.status(200).json(respuesta.response.init_point);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});