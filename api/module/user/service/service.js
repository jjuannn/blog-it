module.exports = class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  testService(user) {
    console.log("Service working");
    this.UserRepository.testRepository(user);
  }
};
