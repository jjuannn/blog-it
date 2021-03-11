class User{
    constructor({id, username, password, picture = ""}){
        this.id = id
        this.username = username
        this.password = password
        this.picture = picture
    }
}

module.exports = User