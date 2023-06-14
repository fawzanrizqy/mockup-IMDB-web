'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie, { foreignKey: 'movieId' })
    }
  }
  Cast.init({
    movieId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Actor Name Must be filled!',
        },
        notEmpty: {
          msg: 'Actor Name Must be filled!',
        },
      },
    },
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};