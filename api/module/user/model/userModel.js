const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = class UserModel extends Model {
  static setup(sequelizeInstance) {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "User",
        paranoid: true,
      }
    );
    return UserModel;
  }
};
