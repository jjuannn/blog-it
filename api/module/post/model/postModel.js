const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = class PostModel extends Model{
    static setup(sequelizeInstance){
        PostModel.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true
            }, 
            title: {
                type: DataTypes.STRING,
                allowNull: false
            }, 
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: "Post",
            paranoid: true
        })

        return PostModel

    }

    static setupAssociations(userModel){
        PostModel.belongsTo(userModel, {foreignKey: "author_id"})
    }
}