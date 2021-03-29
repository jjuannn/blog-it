/// <reference types="jest"/>
const UndefinedError = require("../errors/undefinedError")
const UserService = require("../service")

const repositoryMock = {
    authUser: jest.fn(() => Promise.resolve({})),
    getById: jest.fn(() => Promise.resolve({})),
    newUser: jest.fn(() => Promise.resolve({}))
}

const service = new UserService(repositoryMock)

const userMock = {
    username: "ads",
    password: "123"
}

test("authUser fails if the parameter is undefined", async() => {
    let user 
    try {
        user = await service.authUser()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(user).toBeUndefined()
})
test("authUser call repository correctly", async() => {
    await service.authUser(userMock)
    expect(repositoryMock.authUser).toHaveBeenCalledTimes(1)
    expect(repositoryMock.authUser).toHaveBeenCalledWith(userMock.username, userMock.password)
})

test("getById fails if the parameter in undefined", async() => {
    let user 
    try {
        user = await service.getById()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(user).toBeUndefined()
})

test("getById call repository correctly", async() => {
    await service.getById(1)
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1)
    expect(repositoryMock.getById).toHaveBeenCalledWith(1)
})

test("newUser fails if the parameter is undefined", async() => {
    let user 
    try {
        user = await service.newUser()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(user).toBeUndefined()
})

test("newUser calls repository correctly", async() => {
    await service.newUser(userMock)
    expect(repositoryMock.newUser).toHaveBeenCalledTimes(1)
    expect(repositoryMock.newUser).toHaveBeenCalledWith(userMock)
})

