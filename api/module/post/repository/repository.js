const AbstractRepository = require("./abstractRepository/abstractRepository")
const { modelToEntity} = require("../mapper/postMapper")
const NotFoundError = require("./error/notFoundError")
const UndefinedError = require("./error/undefinedError")

class PostRepository extends AbstractRepository{
    constructor(postModel, userModel){
        super()
        this.postModel = postModel
        this.userModel = userModel
    }

    async delete(id){
        if(!id){
            throw new UndefinedError("id cannot be undefined")
        }
        const post = await this.postModel.findByPk(id)

        if(!post){
            throw new NotFoundError("post not found")
        }
        await post.destroy()

        return true
    }
    
    async getAll(){
        const posts = await this.postModel.findAll({
            include: [{model: this.userModel}],
            order: [
                ['id', 'DESC']
            ]
        })

        return posts.map(post => modelToEntity(post))
    }
    async create(post){
        if(!post){
            throw new UndefinedError("param post cannot be null")
        }
        const buildOptions = { isNewRecord: true };
    
        let newPost;
        newPost = await this.postModel.build(post, buildOptions)
        newPost = await newPost.save();

        const getPost = await this.getById(newPost.dataValues.id)
        return getPost
    }
    async getAllUserPosts(id){
        if(!id){
            throw new UndefinedError("id cannot be undefined")
        }
        const posts = await this.postModel.findAll({
            where: { "author_id": id}, 
            include: [{model: this.userModel}]
        })
        return posts.map(post => modelToEntity(post))

    }
    async getById(id){
        if(!id){
            throw new UndefinedError("id cannot be null")
        }
        const post = await this.postModel.findOne({
            where: {id}, 
            attributes: ["id", "text", "title", "picture", "author_id"],
            include: [{model: this.userModel}]
        });
        if (!post) {
           throw new NotFoundError("Post not found")
        }
        const mappedPost = modelToEntity(post)
        return mappedPost
    }

}

module.exports = PostRepository