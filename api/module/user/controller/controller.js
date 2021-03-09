const AbstractController = require("./abstract/abstractController.js");
const IncorrectPasswordError = require("../repository/error/incorrectPasswordError")
const UsernameAlreadyTakenError = require("../repository/error/usernameAlreadyTakenError")
const UserNotFoundError = require("../repository/error/userNotFoundError")
const { dataToEntity } = require("../mapper/userMapper")


class UserController extends AbstractController {
  constructor(UserService, passport, LocalStrategy, uploadMiddleware) {
    super();
    this.UserService = UserService;
    this.passport = passport;
    this.LocalStrategy = LocalStrategy;
    this.uploadMiddleware = uploadMiddleware;
    this.ROUTE_BASE = "/users";
  }

  configureRoutes(app) {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.post(`${ROUTE_BASE}/register`, (req, res, next) => {
      this.passport.authenticate("local-signup", (err, user, info) => {
        if(err){ 
          if(err instanceof UsernameAlreadyTakenError){
            res.status(401).send('Username already taken!')
          }
          res.status(401).send("Something went wrong. Try again!")
        }
        if(user){ 
          res.status(200).send(user)
        }
        if(info){ 
          res.status(200).send(info)
        }
      })(req, res, next)
    })
    app.post(`${ROUTE_BASE}/login`, (req, res, next) => {
      this.passport.authenticate("local-signin", (err, user, info) => {
        if(err){ 
          if(err instanceof IncorrectPasswordError){
            res.status(401).send('Incorrect Password!')
          }
          if(err instanceof UserNotFoundError){
            res.status(401).send('Username not exist!')
          }
          res.status(401).send("Something went wrong. Try again!")
        }
        if(user){ 
          res.status(200).send(user)
        }
        if(info){ 
          res.status(200).send(info)
        }
      })(req, res, next)
    })
    app.get(`${ROUTE_BASE}/success`, this.success.bind(this))
    app.get(`${ROUTE_BASE}/failure`, this.failure.bind(this))

  }
  configureSignIn(){
    this.passport.use("local-signin", new this.LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    }, async (req, username, password, done) => {
      try {
        const user = dataToEntity(req.body)
        const authUser = await this.UserService.authUser(user)
        return done(null, authUser)
      } catch (e) {
        return done(e)
      }  
    }))
  }
  configureSignUp(){
    this.passport.use("local-signup", new this.LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    }, async (req, username, password, done) => {
      const newUser = dataToEntity(req.body)
      try {
        const user = await this.UserService.newUser(newUser)
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    }))

    this.passport.serializeUser((user, done) => {
      return done(null, user)
    })

    this.passport.deserializeUser(async(id, done) => {
      const findUser = await this.UserService.getById(id)
      return done(null, findUser)
    })
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  success(req, res){
    res.status(200).send({success: true})
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  failure(req, res){
    res.status(401).send({success: false})
  }


}

module.exports = UserController;
