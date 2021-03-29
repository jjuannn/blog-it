const UndefinedError = require("./errors/undefinedError")

module.exports = class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async authUser(userData){
    if(!userData){
      throw new UndefinedError("Credentials cannot be empty")
    }
    const { username, password } = userData
    const user = await this.UserRepository.authUser(username, password)
    return user
  }

  async getById(id){
    if(!id){
      throw new UndefinedError("Credentials cannot be empty")
    }
    const user = await this.UserRepository.getById(id)
    return user
  }
  async newUser(user) {
    if(!user){
      throw new UndefinedError("Credentials cannot be empty")
    }
    const newUser = await this.UserRepository.newUser(user);
    return newUser
  }
};
