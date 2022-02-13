const getAllDogs = require('./getAllDogs');

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  const allDogs = await getAllDogs();
  try {
    console.log('idRaza', idRaza);
    const dogById = await allDogs.filter(d => d.id == idRaza);
    const dog = {
      id: dogById[0].id,
      name: dogById[0].name,
      height: dogById[0].height,
      weight: dogById[0].weight,
      life_span: dogById[0].life_span,
      temperament: dogById[0].temperament,
      image: dogById[0].image,
    }
    console.log('dogById back', dog);
    if(dogById.length !== 0) return res.json(dog);
    else return res.status(404).send('No existe ninguna raza con el id otorgado');
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = getDogsById;