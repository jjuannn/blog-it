const {
  UserController,
  UserRepository,
  UserService,
  UserModel,
} = require("../module/user/module.js");

const {
  PostController,
  PostService, 
  PostRepository,
  PostModel
} = require("../module/post/module.js")

const passport = require("passport")
const LocalStrategy = require("passport-local")
const bcrypt = require("bcrypt")
const { Sequelize } = require("sequelize");
const { default: DIContainer, object, get, factory } = require("rsdi");
const multer = require("multer");
const session = require("express-session");
const path = require("path")


function configureDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH,
  });

  return sequelize;
}

function configureUserStorage(){
  const upload = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, process.env.UPLOAD_MULTER_DIR)
    },  
    filename: function (req, file, cb){
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

  return multer({storage: upload})
}

function configurePostStorage(){
  const upload = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, process.env.UPLOAD_POSTS_IMG_DIR)
    },  
    filename: function (req, file, cb){
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

  return multer({storage: upload})
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
function configurePostModel(container){
  PostModel.setup(container.get("Sequelize"))
  PostModel.setupAssociations(container.get("UserModel"))
  return PostModel
}
function addUserModuleDefinitions(container) {
  container.addDefinitions({
    UserController: object(UserController).construct(
      get("UserService"),
      get("PostService"), 
      get("passport"), 
      get("LocalStrategy"),
      get("userStorage")
    ),
    UserService: object(UserService).construct(get("UserRepository")),
    UserRepository: object(UserRepository).construct(get("UserModel"), get("bcrypt")),
    UserModel: factory(configureUserModel),
  });
}
function addPostModuleDefinitions(container){
  container.addDefinitions({
    PostController: object(PostController).construct(get("PostService"), get("postStorage")),
    PostService: object(PostService).construct(get("PostRepository")),
    PostRepository: object(PostRepository).construct(get("PostModel"), get("UserModel")),
    PostModel: factory(configurePostModel)
  })
}
function addCommonDefinitions(container) {
  container.addDefinitions({
    passport,
    LocalStrategy,
    bcrypt,
    postStorage: factory(configurePostStorage),
    userStorage: factory(configureUserStorage),
    Sequelize: factory(configureDatabase),
    session: factory(configureSession),
  });
}
function configureContainer() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addPostModuleDefinitions(container)
  addUserModuleDefinitions(container);
  return container;
}

module.exports = { configureContainer };
