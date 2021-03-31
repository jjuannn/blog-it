const { dataToEntity, modelToEntity} = require("../postMapper")
const Post = require("../../entity/post")
const User = require("../../../user/entity/user")
test("dataToEntity returns a instance of Post", async() => {
    const newPost = dataToEntity({}, {})
    expect(newPost).toBeInstanceOf(Post)
})
test("dataToEntity also returns a instance of post without a 'file' parameter", async() => {
    const newPost = dataToEntity({})
    expect(newPost).toBeInstanceOf(Post)
})
test("modelToEntity return a instance of Post", async() => {
    const modelMock = {toJSON: jest.fn(()=> {
        return {
            id: 1,
            title: "Lorem Ipsum",
            text: "Lorem Ipsum etc etc etc",
            picture: "post.png",
            author_id: 1
        }
    })}
    const post = modelToEntity(modelMock)
    expect(post).toBeInstanceOf(Post)
})
// GOOGLEAR ESTO DE ACA ARRIBA CUANDO TENGA INTERNET DE VUELTA 
// toJSON() es un metodo de los modelos de Sequelize