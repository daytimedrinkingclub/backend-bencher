require("dotenv").config();
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL, { logging: false });

module.exports = { Model, Sequelize, DataTypes, sequelize };
