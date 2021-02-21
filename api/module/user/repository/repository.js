const AbstractRepository = require("./abstract/abstractRepository.js");

class UserRepository extends AbstractRepository {
  constructor(UserModel) {
    super();
    this.UserModel = UserModel;
  }

  // testRepository() {
  //   console.log("Repository working");
  // }

  async testRepository() {
    console.log("repository working");
    const newRental = { username: "asd1", password: "12345" };
    const buildOptions = { isNewRecord: true };

    let saveRental;
    saveRental = await this.UserModel.build(newRental, buildOptions);
    saveRental.setDataValue("status", "active");

    saveRental = await saveRental.save();
    console.log(await saveRental);
  }
}

module.exports = UserRepository;
