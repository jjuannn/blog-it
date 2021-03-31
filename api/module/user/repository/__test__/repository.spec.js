/// <reference types="jest" />
const UserRepository = require("../repository")
const UserModel = require("../../model/userModel")
const PostModel = require("../../../post/model/postModel")
const { Sequelize } = require("sequelize")
const User = require("../../entity/user")
const UserNotFoundError = require("../error/userNotFoundError")
const EmptyCredentialsError = require("../error/emptyCredentialsError")
const UsernameAlreadyTakenError = require("../error/usernameAlreadyTakenError")
const IncorrectPasswordError = require("../error/incorrectPasswordError")

const bcryptMock = {
    compare: jest.fn(() => Promise.resolve()),
    genSalt: jest.fn((a) => Promise.resolve({a})),
    hash: jest.fn((a) => Promise.resolve(`${a}`))
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

test("getById returns a User if found one with the ID specificated", async() => {
    const newUser = await repository.newUser(userExample)
    const user = await repository.getById(1)

    expect(user).toBeInstanceOf(User)
    expect(user.id).toEqual(newUser.id)
})

test("newUser fails if the username or password length is equal to 0 ", async() => {
    let newUser 
    try {
        newUser = await repository.newUser({username: "", password: ""})
    } catch (err) {
        expect(err).toBeInstanceOf(EmptyCredentialsError)
    }
    expect(newUser).toBeUndefined()
})
test("newUser fails if the username is already taken", async() => {
    await repository.newUser(userExample)
    let newUser
    try {
        newUser = await repository.newUser({username:"test", password:"123131"})
    } catch (err) {
        expect(err).toBeInstanceOf(UsernameAlreadyTakenError)
    }
    expect(newUser).toBeUndefined()
})

test("authUser fails if the username or password length is equal to 0", async() => {
    let authUser 
    try {
        authUser = await repository.authUser("", "")
    } catch (err) {
        expect(err).toBeInstanceOf(EmptyCredentialsError)
    }
    expect(authUser).toBeUndefined()
})
test("authUser fails if not found a user with the username specificated", async() => {
    let authUser 
    try {
        authUser = await repository.authUser("asdasda", "1231313")
    } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundError)
    }
    expect(authUser)
})

test("authUser fails if the password is incorrect", async() => {
    bcryptMock.compare.mockImplementationOnce(() => Promise.resolve(false))
    await repository.newUser(userExample)
    let authUser 
    try {
        authUser = await repository.authUser(userExample.username, "incorrect123")
    } catch (err) {
        expect(err).toBeInstanceOf(IncorrectPasswordError)
    }
    expect(authUser).toBeUndefined()
})

test("authUser returns a User if the password is correct", async() => {
    bcryptMock.compare.mockImplementationOnce(() => Promise.resolve(true))
    await repository.newUser(userExample)
    const user = await repository.authUser("test", "12345")

    expect(user).toBeInstanceOf(User)
})