const AbstractError = require("../error/abstractError")

class AbstractController{
    constructor(){
        if(new.target === AbstractController){
            throw new AbstractError("AbstractController cannot be instanced")
        }
    }
}

module.exports = AbstractController