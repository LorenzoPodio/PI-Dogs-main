const {DataTypes} = require('sequelize');

module.exports = (seq) => {
  seq.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};