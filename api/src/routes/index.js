const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controller/getDogs');
const getDogsById = require('../controller/getDogsById');
const getTemperaments = require('../controller/getTemperaments');
const postDog = require('../controller/postDog');

const router = Router();

router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogsById);
router.get('/temperament', getTemperaments);
router.post('/dog', postDog);

module.exports = router;
