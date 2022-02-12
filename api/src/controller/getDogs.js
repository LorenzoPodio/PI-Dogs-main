const getAllDogs = require('./getAllDogs');

const getDogs = async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAllDogs();
  if (name) {
    try {
      const dogByName = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
      if (dogByName.length !== 0) return res.json(dogByName);
      else return res.status(404).send('La raza que estas buscando no existe');
    } catch {
      return res.status(404).send('Algo malió sal');
    }
  } else {
    try {
      return res.json(allDogs);
    } catch {
      return res.status(404).send('Hubo un error');
    }
  }
};

module.exports = getDogs;