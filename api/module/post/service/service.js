const InvalidDataError = require("./error/invalidDataError")
const Post = require("../entity/post")

module.exports = class PostService{
    constructor(userRepository){    
        this.userRepository = userRepository
    }

    async getAllUserPosts(id){
        if(id === undefined){
            throw new InvalidDataError("ID cannot be undefined")
        }
        const posts = await this.userRepository.getAllUserPosts(id)
        return posts
    }

    async delete(id){
        if(id === undefined){
            throw new InvalidDataError("ID cannot be undefined")
        }
        await this.userRepository.delete(id)
    }

    async getAll(){
        const posts = await this.userRepository.getAll()
        return posts 
    }

    async create(post){
        if(!(post instanceof Post)){
            throw new InvalidDataError("Post data is not a instance of Post")
        }
        await this.userRepository.create(post)
    }
}