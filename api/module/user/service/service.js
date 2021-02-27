module.exports = class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async authUser(userData){
    const { username, password } = userData
    const user = await this.UserRepository.authUser(username, password)
    return user
  }

  async getById(id){
    const user = await this.UserRepository.getById(id)
    return user
  }
  async newUser(user) {
    const newUser = await this.UserRepository.newUser(user);
    return newUser
  }
};
