const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controller/getDogs');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// const getApiInfo = async () => {
//   const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}&limit=10`);
//   const apiInfo = await apiUrl.data.map( e => {
//     return {
//       name: e.name,
//       height: e.height.metric,
//       weight: e.weight.metric,
//       life_span: e.life_span,
//       temperament: e.temperament
//     }
//   });
//   return apiInfo;
// };

// const getDbInfo = async () => {
//   return await Dog.findAll({

//   });
// };

router.get('/dogs', getDogs);

router.get('/dogs/:idRaza',);

router.get('/temperament',);

router.post('/dog',);


module.exports = router;
