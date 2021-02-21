const UserController = require("./controller/controller.js");
const UserService = require("./service/service.js");
const UserModel = require("./model/userModel.js");
const UserRepository = require("./repository/repository.js");

function initUserModule(app, container) {
  const controller = container.get("UserController");
  controller.configureRoutes(app);
}

module.exports = {
  UserController,
  UserService,
  UserRepository,
  UserModel,
  initUserModule,
};
