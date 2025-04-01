const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');  // Importa las rutas

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Usa las rutas importadas
app.use('/api', routes);  // Agrega el prefijo '/api' para todas las rutas

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
