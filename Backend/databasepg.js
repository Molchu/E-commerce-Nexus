const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg');

const app = express();
const port = 4000;

const client = new Client({
    host: "localhost",
    user: "Molchu",
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

app.post('/login', async (req, res) => {
    const { nombre, apellido, correo, cedula, ciudad, fecha_nacimiento, contrasena } = req.body;
    try {
        const existingUser = await client.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
        const existingId = await client.query('SELECT * FROM usuario WHERE cedula=$1', [cedula]);
        if (existingId.rows.length>0) {
            return res.status(400).json({ error: 'documento de identidad ya registrado' })
        }
        if (existingUser.rows.length>0) {
            return res.status(400).json({ error: 'correo ya registrado' })
        }

        await client.query('INSERT INTO usuario (nombre, apellido, correo, cedula, ciudad, fecha_nacimiento,contrasena) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellido, correo, cedula, ciudad, fecha_nacimiento,contrasena]);
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});