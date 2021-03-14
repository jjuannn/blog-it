const PostController = require("./controller/controller")
const PostService = require("./service/service")
const PostRepository = require("./repository/repository")
const PostModel = require("./model/postModel")

function initPostModule(app, container){
    const controller = container.get("PostController")
    controller.configureRoutes(app)
}

module.exports = {
    PostController,
    PostService,
    PostRepository,
    PostModel,
    initPostModule
}