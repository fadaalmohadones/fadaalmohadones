const express = require('express');
const pool = require('../config/db');  // Importa la conexión a PostgreSQL
const authMiddleware = require('../config/auth'); // Importa autenticación

const router = express.Router();

// Ruta protegida para obtener clientes
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Clients"');
        res.json({ clients: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

router.get('/public', (req, res) => {
    res.json({ message: "Esta es una ruta pública" });
});

module.exports = router;
