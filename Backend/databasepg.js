const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {Client} = require('pg');


const app = express();
app.use(express.json());
app.use(cors());
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
/*
app.post('/signup', async (req, res) => {
    const { nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena } = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
        if (existingUser.rows.length>0) {
            return res.status(400).json({ error: 'correo ya registrado' })
        }

        await client.query('INSERT INTO usuario (nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellido, correo, telefono, id, fecha_nacimiento,contrasena]);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});
*/
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
        await client.query('INSERT INTO usuario (nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena, cartData) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [nombre, apellido, correo, telefono, id, fecha_nacimiento,contrasena,JSON.stringify(cart)]);

        const newUser = await client.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
        const user = newUser.rows[0];
        if (!user) {
            return res.status(400).json({ success: false, errors: 'No se pudo crear el usuario' });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        console.log("Generated token:", token); // Imprimir el token aquí
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});




/*
app.post('/signin', async (req, res) => {
    const {correo, contrasena} = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1 AND contrasena=$2', [correo, contrasena]);
        if (existingUser.rows.length == 0) {
            res.status(400).json({ message: 'No existe el usuario' });
        }
        else {
            await client.query('UPDATE usuario SET activo=$1 WHERE correo=$2', [1,correo]);
            return res.status(200).json({ message:'Sesión iniciada' })
        }
    } catch (error) {
        console.error('El usuario no existe o la información no es correcta', error);
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
});
*/

app.post('/signin', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1 AND contrasena=$2', [correo, contrasena]);
        if (existingUser.rows.length === 0) {
            return res.json({ success: false, errors: "Usuario o contraseña incorrectos" });
        }

        const data = { user: { id: existingUser.rows[0].id } };
        const token = jwt.sign(data, 'secret_ecom');
        console.log("Generated token:", token); // Imprimir el token aquí
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        res.status(500).json({ error: 'Error al verificar el usuario' });
    }
});


const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images', express.static("upload/images"))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.post('/addproduct',async (req, res) => {
    const { name, image, category, new_price, old_price } = req.body;
    try {
        const products = await client.query('SELECT * FROM product');
        let id;
        if(products.rows.length > 0) {
            let lastproduct = products.rows[products.rows.length - 1];
            id = lastproduct.id + 1;
        } else {
            id = 1;
        }

        await client.query('INSERT INTO product (id, name, image, category, new_price, old_price) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, image, category, new_price, old_price]);
        console.log("Saved");
        res.json({
            success: true,
            name: name,
        })
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
})

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

// Get all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await client.query('SELECT * FROM product');
        console.log("All Products Fetched");
        res.send(products.rows);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Error fetching all products' });
    }
});


app.get('/newcollections', async (req, res) => {
    try {
        const products = await client.query('SELECT * FROM product ORDER BY date DESC LIMIT 8');
        console.log("Nuevas colecciones obtenidas");
        res.send(products.rows);
    } catch (error) {
        console.error('Error al obtener nuevas colecciones:', error);
        res.status(500).json({ error: 'Error al obtener nuevas colecciones' });
    }
});

app.get('/popularcollection', async (req, res) => {
    try {
        const products = await client.query('SELECT * FROM product WHERE category = $1 LIMIT 4', ['Ropa']);
        console.log("Colección popular obtenida");
        res.send(products.rows);
    } catch (error) {
        console.error('Error al obtener la colección popular:', error);
        res.status(500).json({ error: 'Error al obtener la colección popular' });
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
        res.send("Product added to cart");
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
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
            res.send("Product removed from cart");
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Error removing product from cart' });
    }
});




app.get('/getcart', fetchUser, async (req, res) => {
    const userId = req.user.id;
    try {
        const cartItems = await client.query('SELECT p.id, p.name, p.image, p.new_price, up.quantity FROM user_product up JOIN product p ON up.product_id = p.id WHERE up.user_id = $1 AND up.quantity > 0', [userId]);
        res.json(cartItems.rows);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Error fetching cart items' });
    }
});



app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});