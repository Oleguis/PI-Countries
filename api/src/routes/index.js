const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const activiturRoute = require('./activiturRoute');
const countriesRoute = require('./countriesRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/turismo', activiturRoute);
router.use('/countries', countriesRoute);


module.exports = router;
