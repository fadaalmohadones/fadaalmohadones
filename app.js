// Instalar dependencias necesarias
// npm install express pg dotenv cors

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// Configurar conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// Ruta para obtener items desde la base de datos
app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Clients"');
        res.json({ items: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos', details: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
