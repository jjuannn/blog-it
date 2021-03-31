/// <reference types="jest"/>

const PostController = require("../controller")

const serviceMock = {
    delete: jest.fn(() => Promise.resolve(true)),
    getAll: jest.fn(() => Promise.resolve([])),
    create: jest.fn(() => Promise.resolve({})),
    getAllUserPosts: jest.fn(() => Promise.resolve([]))
}

const controller = new PostController(serviceMock, {})
test("create calls service correctly", () => {
    const req = {body: {}}

    serviceMock.create.mockImplementationOnce(() => Promise.resolve())

    controller.create(req, {})
    expect(serviceMock.create).toHaveBeenCalledTimes(1)
})
test("getAll calls service correctly", () => {
    controller.getAll()
    expect(serviceMock.getAll).toHaveBeenCalledTimes(1)
})
test("delete calls service correctly", () => {
    controller.delete({query: {id: 1}}, {})

    expect(serviceMock.delete).toHaveBeenCalledTimes(1)
    expect(serviceMock.delete).toHaveBeenCalledWith(1)
})