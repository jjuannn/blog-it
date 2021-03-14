const AbstractRepository = require("./abstractRepository/abstractRepository")
const { modelToEntity} = require("../mapper/postMapper")
const NotFoundError = require("./error/notFoundError")

class PostRepository extends AbstractRepository{
    constructor(postModel, userModel){
        super()
        this.postModel = postModel
        this.userModel = userModel
    }

    async create(post){
        const buildOptions = { isNewRecord: true };
    
        let newPost;
        newPost = await this.postModel.build(post, buildOptions)
        newPost = await newPost.save();

        const getPost = await this.getById(newPost.dataValues.id)
        return getPost
    }

    async getById(id){
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