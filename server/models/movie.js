'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'authorId' })
      this.belongsTo(models.Genre, { foreignKey: 'genreId' })
      this.hasMany(models.Cast, { foreignKey: 'movieId' })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title Must be filled!',
        },
        notEmpty: {
          msg: 'title Must be filled!',
        },
      },
    },
    slug: DataTypes.STRING,
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'synopsis Must be filled!',
        },
        notEmpty: {
          msg: 'synopsis Must be filled!',
        },
      },
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'genre Must be filled!',
        },
        notEmpty: {
          msg: 'genre Must be filled!',
        },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'author id Must be filled!',
        },
        notEmpty: {
          msg: 'author id Must be filled!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};