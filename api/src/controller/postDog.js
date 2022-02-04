const {Dog, Temperament} = require('../db')

const postDog = async (req, res) => {
  const {name, height, weight, life_span, temperament} = req.body;
  try {
    const createDog = await Dog.create({
      name, height, weight, life_span
    });
    const tempsDb = await Temperament.findAll({
      where: {name: temperament}
    });
    createDog.addTemperament(tempsDb)
    res.send('Raza de perro creada exitosamente')
  } catch (error) {
    res.status(400).send(error)
  }
};

module.exports = postDog;