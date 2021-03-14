const Post = require("../entity/post")
const MULTER_DIR = process.env.UPLOAD_POSTS_IMG_DIR

function dataToEntity(post, file){
    const { id, title, text, author_id } = post
    if(file){
        const { filename } = file
        const picture = `http://localhost:8080/${MULTER_DIR}?img=${filename}`
        return new Post({id, author_id, text, title, picture})
    } else {
        return new Post({id, author_id, text, title})
    }
}

function modelToEntity(model){
    return new Post(model.toJSON())
}

module.exports = { dataToEntity, modelToEntity}