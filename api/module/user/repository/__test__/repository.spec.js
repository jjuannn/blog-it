/// <reference types="jest" />
const UserRepository = require("../repository")
const UserModel = require("../../model/userModel")
const PostModel = require("../../../post/model/postModel")
const { Sequelize } = require("sequelize")
const User = require("../../entity/user")
const UserNotFoundError = require("../error/userNotFoundError")

const bcryptMock = {
    compare: jest.fn(() => Promise.resolve()),
    genSalt: jest.fn(() => Promise.resolve()),
    hash: jest.fn(() => Promise.resolve())
}

const sequelizeInstance = new Sequelize("sqlite::memory")

let repository 
beforeAll(() => {
    UserModel.setup(sequelizeInstance)
    PostModel.setup(sequelizeInstance)
    
    repository = new UserRepository(UserModel, bcryptMock, PostModel)
})

beforeEach(async(done) => {
    await sequelizeInstance.sync({force: true})
    done()
})

const userExample = new User({
    id: undefined,
    username: "test",
    password: "12345",
    picture: "asd.png"
})

test("getById fails if not found a user with the id specificated", async() => {
    let user
    try {
        user = await repository.getById(123123)
    } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundError)       
    }
    expect(user).toBeUndefined()
})

// test("getById returns a User if found a user with the id specificated", async() => {
//     const user = await repository.newUser(userExample)

//     const getUser = await repository.getById(1)
//     expect(getUser).toEqual([user])
// })