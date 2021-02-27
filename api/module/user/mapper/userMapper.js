const User = require("../entity/user")

function dataToEntity(user){
    const { id, username, password } = user
    return new User({id, username, password})
}

function modelToEntity(model){
    return new User(model.toJSON())
}

module.exports = { dataToEntity, modelToEntity}