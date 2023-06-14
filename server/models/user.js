'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/encryptor');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Movie, { foreignKey: 'authorId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'username Must be filled!',
        },
        notEmpty: {
          msg: 'username Must be filled!',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'email Must be unique!',
      },
      validate: {
        isEmail: {
          msg: 'wrong email format!',
        },
        notNull: {
          msg: 'email Must be filled!',
        },
        notEmpty: {
          msg: 'email Must be filled!',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password Must be filled!',
        },
        notEmpty: {
          msg: 'password Must be filled!',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'role Must be filled!',
        },
        notEmpty: {
          msg: 'role Must be filled!',
        },
      },
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPass(user.password)
  })
  return User;
};