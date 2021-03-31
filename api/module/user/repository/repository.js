const AbstractRepository = require("./abstract/abstractRepository.js");
const IncorrectPasswordError = require("./error/incorrectPasswordError")
const UsernameAlreadyTakenError = require("./error/usernameAlreadyTakenError")
const UserNotFoundError = require("./error/userNotFoundError")
const { modelToEntity } = require("../mapper/userMapper")
const EmptyCredentialsError = require("./error/emptyCredentialsError")
class UserRepository extends AbstractRepository {
  constructor(UserModel, bcrypt, PostModel) {
    super();
    this.UserModel = UserModel;
    this.bcrypt = bcrypt
    this.PostModel = PostModel
  }

  async authUser(username, password){
    if(username.length == 0 || username.length == 0){
      throw new EmptyCredentialsError("Credentials cannot be empty")
    }
    const user = await this.UserModel.findOne({where: {username}, attributes: ["id", "username", "password"]})
    if (user) {
      const matchPassword = await this.bcrypt.compare(password, user.password)
      if(matchPassword){
        const userData = await this.getById(user.id)
        return userData
      } else {
        throw new IncorrectPasswordError("Incorrect Password!")
      }
    } else {
      throw new UserNotFoundError("User not found")
    }
  }

  async getById(id){
    const user = await this.UserModel.findOne({where: {id}, attributes: ["id", "username", "picture"]});
    if (!user) {
      throw new UserNotFoundError("User not found")
    }
    const mappedUser = modelToEntity(user)
    return mappedUser
  }

  async newUser(user){
    const { username, password} = user
    if(username.length == 0 || username.length == 0){
      throw new EmptyCredentialsError("Credentials cannot be empty")
    }
    const userExist = await this.UserModel.findOne({where: {username}, attributes: ["id", "username"]});
    if(userExist){  
      throw new UsernameAlreadyTakenError("Username already taken")
    }

    const buildOptions = { isNewRecord: true };
    
    let newUser;
    newUser = await this.UserModel.build(user, buildOptions)

    const salt = await this.bcrypt.genSalt(10)
    const hash = await this.bcrypt.hash(password, salt)

    newUser.password = await hash
    newUser = await newUser.save();

    const getUser = await this.getById(newUser.dataValues.id)
    return getUser
  }
}

module.exports = UserRepository;
