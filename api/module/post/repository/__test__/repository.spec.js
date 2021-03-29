/// <reference types="jest" />
const PostModel = require("../../model/postModel")
const UserModel = require("../../../user/model/userModel")
const PostRepository = require("../repository")
const { Sequelize } = require("sequelize")
const Post = require("../../entity/post")
const User = require("../../../user/entity/user")
const UndefinedError = require("../error/undefinedError")
const NotFoundError = require("../error/notFoundError")

const sequelizeInstance = new Sequelize("sqlite::memory")

let repository 

beforeAll(() => {
    const post = PostModel.setup(sequelizeInstance)
    const user = UserModel.setup(sequelizeInstance)
    post.setupAssociations(user)

    repository = new PostRepository(post, user)
})

beforeEach(async(done) => {
    await sequelizeInstance.sync({force: true})
    done()
})

const samplePost = new Post({
    id: undefined,
    title: "Lorem Ipsum",
    text: "Lorem Ipsum etc etc etc",
    picture: "post.png",
    author_id: undefined
})

test("create a post correctly", async() => {
    const EXPECTED_ID = 1
    const newPost = await repository.create(samplePost)
    expect(newPost.id).toEqual(EXPECTED_ID)
})

test("fails trying to create a post without passing a post", async() => {
    let post 
    try {
        post = await repository.create()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)     
    }
    expect(post).toBeUndefined()
})

test("deletes a post correctly", async() => {
    const newPost = await repository.create(samplePost)

    const posts = await repository.getAll()
    expect(posts.length).toBe(1)
    expect(posts).toEqual([newPost])

    const deletedPost = await repository.delete(newPost.id)
    expect(deletedPost).toBe(true)

    const updatedPosts = await repository.getAll()
    expect(updatedPosts.length).toBe(0)
    expect(updatedPosts).toEqual([])
})

test("fails trying to delete a post without an id", async() => {
    let deletedPost 
    try {
        deletedPost = await repository.delete()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(deletedPost).toBeUndefined()
})

test("fails trying to delete a post with an non-existent id", async() => {
    let deletedPost
    try {
        deletePost = await repository.delete(123123)
    } catch (err) {
        expect(err).toBeInstanceOf(NotFoundError)
    }
    expect(deletedPost).toBeUndefined()
})

test("getAll returns an array with all the posts", async() => {
    const newPost = await repository.create(samplePost)

    const posts = await repository.getAll()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBe(1)
    expect(posts).toEqual([newPost])
})

test("getAllUserPosts fails when calling it without an id ", async() => {
    let userPosts
    try {
        userPosts = await repository.getAllUserPosts()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(userPosts).toBeUndefined()
})
test("getAllUserPosts returns an array of posts when calling correctly", async() => {
    const sampleUser = new User({
        id: 1,
        username: "asd123",
        password: "123456"
    })
    let user = await repository.userModel.build(sampleUser, {isNewRecord: true})
    user = await user.save()

    const samplePost = new Post({
        id: undefined,
        title: "Lorem Ipsum",
        text: "Lorem Ipsum etc etc etc",
        author_id: 1
    })
    const newPost = await repository.create(samplePost)
    
    const userPosts = await repository.getAllUserPosts(user.dataValues.id)
    expect(Array.isArray(userPosts)).toBe(true)
    expect(userPosts.length).toBe(1)
    expect(userPosts).toEqual([newPost])
})

test("getById fails when calling it without an id", async() => {
    let post 
    try {
        post = await repository.getById()
    } catch (err) {
        expect(err).toBeInstanceOf(UndefinedError)
    }
    expect(post).toBeUndefined()
})

test("getById fails when not found a post with the id specificated", async() => {
    let post
    try {
        post = await repository.getById(123123)
    } catch (err) {
        expect(err).toBeInstanceOf(NotFoundError)
    }
    expect(post).toBeUndefined()
})

test("getById returns an Post when found a post with the id specificated", async() => {
    const newPost = await repository.create(samplePost)
    const post = await repository.getById(1)

    expect(post).toBeInstanceOf(Post)
    expect(post.id).toEqual(newPost.id)
})