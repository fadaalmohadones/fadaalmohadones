const app = require('./app');
const clientsRoutes = require('./modules/clients');
const loginRoutes = require('./modules/login');

app.use('/api', clientsRoutes);
app.use('/api', loginRoutes);
