const AbstractRepository = require("./abstract/abstractRepository.js");

class UserRepository extends AbstractRepository {
  constructor(UserModel, bcrypt) {
    super();
    this.UserModel = UserModel;
    this.bcrypt = bcrypt
  }

  async authUser(username, password){
    console.log("repository authUser")
    const user = await this.UserModel.findOne({where: {username}});
    if (user) {
      const matchPassword = await this.bcrypt.compare(password, user.dataValues.password)
      if(matchPassword){
        return user
      } else{
        throw new Error("Incorrect password")
      }
    } else{
      throw new Error("Username not found")
    }
  }

  async getById(id){
    console.log("Repository getById")
    const user = await this.UserModel.findOne({where: {id}});
    if (!user) {
      throw new Error("id not found")
    }
    return user
  }

  async newUser(user) {
    console.log("repository newUser")
    const { username } = user
    const userExist = await this.UserModel.findOne({where: {username}})

    if(userExist){
      throw new Error("Username is already taken")
    }

    const buildOptions = { isNewRecord: true };
    
    let newUser;
    newUser = await this.UserModel.build(user, buildOptions);

    const salt = await this.bcrypt.genSalt(10)
    const hash = await this.bcrypt.hash(user.password, salt)

    newUser.password = await hash
    newUser = await newUser.save();
    const getUser = await this.getById(newUser.dataValues.id)
    return getUser
  }
}

module.exports = UserRepository;
