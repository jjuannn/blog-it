class Post{
    constructor({id, author_id, text, title, picture = null, User = null}){
        this.id = id
        this.text = text
        this.title = title
        this.picture = picture
        this.author_id = author_id

        if(picture){
            this.picture = picture
        }

        if(User){
            this.author_username = User.username
            this.author_picture = User.picture
        }

    }
}

module.exports = Post