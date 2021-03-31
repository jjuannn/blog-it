const {Sequelize} = require("sequelize")
const PostModel = require("../postModel")
const UserModel = require("../../../user/model/userModel")

const sequelizeInstance = new Sequelize("sqlite::memory")

test("Posts table is created when setup the model", async() => {
    PostModel.setup(sequelizeInstance)
    UserModel.setup(sequelizeInstance)
    PostModel.setupAssociations(UserModel)
    await PostModel.sync({force: true})
    expect(PostModel.getTableName()).toBe("Posts")
})