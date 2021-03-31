const {Sequelize} = require("sequelize")
const UserModel = require("../userModel")

const sequelizeInstance = new Sequelize("sqlite::memory")

test("User table is created when setup the model", async() => {
    UserModel.setup(sequelizeInstance)
    await UserModel.sync({force: true})
    expect(UserModel.getTableName()).toBe("Users")
})