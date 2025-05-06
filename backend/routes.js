const express = require('express');
const router = express.Router();

const clientsRoutes = require('./modules/clients');
const loginRoutes = require('./modules/login');
const ordersRoutes = require('./modules/orders');

// Monta las rutas específicas en el router
router.use('/clients', clientsRoutes);
router.use('/login', loginRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
