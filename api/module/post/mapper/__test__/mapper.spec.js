const { dataToEntity, modelToEntity} = require("../postMapper")
const Post = require("../../entity/post")

test("dataToEntity returns a instance of Post", async() => {
    const newPost = dataToEntity({}, {})
    expect(newPost).toBeInstanceOf(Post)
    // testear el otro path
})
test("dataToEntity also returns a instance of post without a 'file' parameter", async() => {
    const newPost = dataToEntity({})
    expect(newPost).toBeInstanceOf(Post)
})
// test("modelToEntity return a instance of Post", async() => {
//     const newPost = modelToEntity([{}])
//     expect(newPost).toBeInstanceOf(Post)
// })
// GOOGLEAR ESTO DE ACA ARRIBA CUANDO TENGA INTERNET DE VUELTA 
// toJSON() es un metodo de los modelos de Sequelize