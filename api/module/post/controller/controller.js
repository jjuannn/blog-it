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
        app.get(`${this.ROUTE_BASE}/all`, this.getAll.bind(this))
        app.post(`${this.ROUTE_BASE}/create`,
            this.uploadMiddleware.single("picture") ,
            this.create.bind(this)
        )
        app.delete(`${this.ROUTE_BASE}/delete?:img`, this.delete.bind(this))
    }
    /**
    * @param {import("express").Request} req
    * @param {import("express").Response} res
    */
    async delete(req, res){
        const {id} = req.query    
        try {
            await this.postService.delete(id)
            res.status(200).send("Deleted successfuly")
        } catch(e){
            res.status(400).send("Something failed :( Try again!")
        }
    }
    /**
    * @param {import("express").Request} req
    * @param {import("express").Response} res
    */
    async getAll(req, res){
        try{    
            const posts = await this.postService.getAll()
            res.status(200).send(posts)
        } catch(e){
            res.send(400).send("Failed getting posts :( Try again!")
        }
    }
    /**
    * @param {import("express").Request} req
    * @param {import("express").Response} res
   */
    async create(req, res){
        let post
        try{
            if(req.file){
                post = dataToEntity(req.body, req.file)
            } else {
                post = dataToEntity(req.body)
            }
            await this.postService.create(post)
            res.status(200).send("Published!")
        } catch (err){
            res.status(400).send("Something went wrong :( Try again!")
        }
    }

}

module.exports = PostController