const AbstractController = require("./abstract/abstractController")
const { dataToEntity } = require("../mapper/postMapper")

class PostController extends AbstractController{
    constructor(postService, uploadMiddleware){
        super()
        this.postService = postService
        this.uploadMiddleware = uploadMiddleware
        this.ROUTE_BASE = "/posts"
    }

    configureRoutes(app){
        app.post(`${this.ROUTE_BASE}/create`,
            this.uploadMiddleware.single("picture") ,
            this.create.bind(this)
        )
    }
    
    /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
    create(req, res){
        let post
        try{
            if(req.file){
                post = dataToEntity(req.body, req.file)
            } else {
                post = dataToEntity(req.body)
            }
            this.postService.create(post)
            res.status(200).send("Published!")
        } catch (err){
            console.log(err)
            res.status(400).send("Something went wrong :( Try again!")
        }
    }

}

module.exports = PostController