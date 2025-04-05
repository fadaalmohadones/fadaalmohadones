const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Aquí se usa el router ya construido
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
