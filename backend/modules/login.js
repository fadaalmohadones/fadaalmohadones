const express = require('express'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const pool = require('../config/db'); // Asegúrate de que este path esté bien

const router = express.Router();

// Ruta de login para generar token
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query('SELECT * FROM "Users" WHERE username = $1', [username]);
        const user = result.rows[0];
        
        if (!user || password != user.password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.json({ token, "username":user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
