const AbstractRepository = require("./abstract/abstractRepository.js");

class UserRepository extends AbstractRepository {
  constructor(UserModel, bcrypt) {
    super();
    this.UserModel = UserModel;
    this.bcrypt = bcrypt
  }

  // testRepository() {
  //   console.log("Repository working");
  // }

  async testRepository(user) {
    console.log(user.password)
    console.log("repository working");
    const buildOptions = { isNewRecord: true };

    let newUser;
    newUser = await this.UserModel.build(user, buildOptions);

    const salt = await this.bcrypt.genSalt(10)
    const hash = await this.bcrypt.hash(user.password, salt)

    newUser.password = await hash
    newUser = await newUser.save();
    console.log(await newUser);
  }
}

module.exports = UserRepository;
