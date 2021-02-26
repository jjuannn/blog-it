const AbstractController = require("./abstract/abstractController.js");

class UserController extends AbstractController {
  constructor(UserService, passport, LocalStrategy) {
    super();
    this.UserService = UserService;
    this.passport = passport;
    this.LocalStrategy = LocalStrategy;
    this.ROUTE_BASE = "/users";
  }

  configureRoutes(app) {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.post(`${ROUTE_BASE}/register`, (req, res, next) => {
      this.passport.authenticate("local-signup", (err, user, info) => {
        if(err){ 
          res.status(401).send({error: "Username already taken"})
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
          res.status(401).send(err)
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
        const user = await this.UserService.authUser(username, password)
        return done(null, user)
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
      const newUser = {
        username,
        password
      }
      try {
        const user = await this.UserService.newUser(newUser)
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    }))

    this.passport.serializeUser((user, done) => {
      console.log("SERIALIZING")
      return done(null, user)
    })

    this.passport.deserializeUser(async(id, done) => {
      console.log("DESERIALIZING")
      const findUser = await this.UserService.getById(id)
      return done(null, findUser)
    })
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  success(req, res){
    console.log("success")
    res.status(200).send({success: true})
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  failure(req, res){
    console.log("failure")
    res.status(401).send({success: false})
  }


}

module.exports = UserController;
