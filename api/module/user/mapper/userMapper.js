const User = require("../entity/user")
const MULTER_DIR = process.env.UPLOAD_MULTER_DIR

function dataToEntity(user, file){
    const { id, username, password} = user
    if(file){
        const { filename } = file
        const picture = `http://localhost:8080/${MULTER_DIR}?img=${filename}`
        return new User({id, username, password, picture})
    } else {
        return new User({id, username, password })
    }
}

function modelToEntity(model){
    return new User(model.toJSON())
}

module.exports = { dataToEntity, modelToEntity}