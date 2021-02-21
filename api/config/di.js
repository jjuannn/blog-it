const {
  UserController,
  UserRepository,
  UserService,
  UserModel,
} = require("../module/user/module.js");

const { Sequelize } = require("sequelize");
const { default: DIContainer, object, get, factory } = require("rsdi");
const multer = require("multer");
const session = require("express-session");

function configureDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH,
  });

  return sequelize;
}
function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };

  return session(sessionOptions);
}

function configureUserModel(container) {
  return UserModel.setup(container.get("Sequelize"));
}
function addUserModuleDefinitions(container) {
  container.addDefinitions({
    UserController: object(UserController).construct(get("UserService")),
    UserService: object(UserService).construct(get("UserRepository")),
    UserRepository: object(UserRepository).construct(get("UserModel")),
    UserModel: factory(configureUserModel),
  });
}

function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureDatabase),
    session: factory(configureSession),
  });
}
function configureContainer() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addUserModuleDefinitions(container);
  return container;
}

module.exports = { configureContainer };
