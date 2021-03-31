/// <reference types="jest"/>
const {dataToEntity, modelToEntity } = require("../userMapper")
const User = require("../../entity/user")

test("dataToEntity returns a instance of User", async() => {
    const user = dataToEntity({}, {})
    expect(user).toBeInstanceOf(User)
})
test("dataToEntity returns a instance of User without a 'file' parameter", async() => {
    const user = dataToEntity({})
    expect(user).toBeInstanceOf(User)
})

test("modelToEntity returns a instance of User", async() => {
    const modelMock = { toJSON: jest.fn( () => {
        return {
            id: 1,
            username: "asd",
            password: "asd123",
            picture: "asd.png"
        }
    })}
    const user = modelToEntity(modelMock)
    expect(user).toBeInstanceOf(User)
})