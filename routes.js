const express = require('express');
const router = express.Router();

const clientsRoutes = require('./modules/clients');
const loginRoutes = require('./modules/login');

// Monta las rutas específicas en el router
router.use('/clients', clientsRoutes);
router.use('/login', loginRoutes);

module.exports = router;
