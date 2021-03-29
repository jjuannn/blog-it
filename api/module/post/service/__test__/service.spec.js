/// <reference types="jest" />
const PostService = require("../service")
const Post = require("../../entity/post")
const InvalidDataError = require("../error/invalidDataError")

const samplePost = new Post({
    id: 1,
    title: "Lorem Ipsum",
    text: "Lorem Ipsum etc etc etc",
    picture: "post.png",
    author_id: undefined 
})

const repositoryMock = {
    delete: jest.fn(() => Promise.resolve({})),
    getAll: jest.fn(() => Promise.resolve({})),
    create: jest.fn(() => Promise.resolve({})),
    getAllUserPosts: jest.fn(() => Promise.resolve({})),
    getById: jest.fn(() => Promise.resolve({}))
}

const service = new PostService(repositoryMock)

test("getAllUserPosts fails when calling it with a invalid id", async() => {
    let posts 
    try {
        posts = await service.getAllUserPosts()
    } catch (err) {
        expect(err).toBeInstanceOf(InvalidDataError)
    }   
    expect(posts).toBeUndefined()
})

test("getAllUserPosts calls repository correctly", async() => {
    await service.getAllUserPosts(1)

    expect(repositoryMock.getAllUserPosts).toHaveBeenCalledTimes(1)
    expect(repositoryMock.getAllUserPosts).toHaveBeenCalledWith(1)
})

test("delete fails when calling it with an undefined ID", async() => {
    let deletePost 
    try {
        deletePost = await service.delete()
    } catch (err) {
        expect(err).toBeInstanceOf(InvalidDataError)
    }
    expect(deletePost).toBeUndefined()
})

test("delete calls repository correctly", async() => {
    await service.delete(1)

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
    expect(repositoryMock.delete).toHaveBeenCalledWith(1)
})

test("getAll calls repository correctly", async() => {
    await service.getAll()
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1)
})

test("create fails if the post is not a instance of Post", async() => {
    let post 
    try {
        post = service.create({})
    } catch (err) {
        expect(err).toBeInstanceOf(InvalidDataError)
    }
    expect(repositoryMock.create).toHaveBeenCalledTimes(0)
})

test("create calls repository correctly", async() => {
    const post = new Post({})
    await service.create(post)

    expect(repositoryMock.create).toHaveBeenCalledTimes(1)
    expect(repositoryMock.create).toHaveBeenCalledWith(post)
})