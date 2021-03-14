const AbstractError = require("../error/abstractError")

class AbstractRepository{
    constructor(){
        if(new.target === AbstractRepository){
            throw new AbstractError("AbstractRepository cannot be instanced")
        }
    }
}

module.exports = AbstractRepository