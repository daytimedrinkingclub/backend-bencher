require("dotenv").config();
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.db_url, { logging: false });

module.exports = { Model, Sequelize, DataTypes, sequelize };
