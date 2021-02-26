module.exports = class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async authUser(username, password){
    console.log("service authUser")
    const user = await this.UserRepository.authUser(username, password)
    return user
  }

  async getById(id){
    console.log("Service getById")
    return await this.UserRepository.getById(id)
  }
  async newUser(user) {
    console.log("service newUser")
    const newUser = await this.UserRepository.newUser(user);
    return newUser
  }
};
