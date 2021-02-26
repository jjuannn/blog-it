const AbstractRepository = require("./abstract/abstractRepository.js");

class UserRepository extends AbstractRepository {
  constructor(UserModel, bcrypt) {
    super();
    this.UserModel = UserModel;
    this.bcrypt = bcrypt
  }

  async authUser(username, password){
    const user = await this.UserModel.findOne({where: {username}});
    if (user) {
      const matchPassword = await this.bcrypt.compare(password, user.dataValues.password)
      if(matchPassword){
        const userData = await this.getById(user.dataValues.id)
        return userData
      } else {
        throw new Error("Incorrect password")
      }
    } else {
      console.log("FALLE")
      throw new Error("Username not exist")
    }
  }

  async getById(id){
    const user = await this.UserModel.findOne({where: {id}, attributes: ["id", "username"]});
    if (!user) {
      throw new Error("id not found")
    }
    return user
  }

  async newUser(user) {
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
