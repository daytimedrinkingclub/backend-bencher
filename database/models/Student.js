const { sequelize, Model, DataTypes } = require("../db");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // firebase_uid: {
    //   type: DataTypes.STRING(100),
    //   unique: true,
    //   allowNull: false,
    // },
    email: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.STRING(3000),
      unique: false,
      allowNull: true,
    },
    sign_in_provider: {
      type: DataTypes.STRING(100),
      unique: false,
      allowNull: false,
      defaultValue: 'email',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
  },
  { sequelize },
);

module.exports = Student;
