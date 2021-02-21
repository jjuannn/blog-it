module.exports = class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  testService() {
    console.log("Service working");
    this.UserRepository.testRepository();
  }
};
