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

    app.get(ROUTE_BASE, this.probando.bind(this));
    app.post(`${ROUTE_BASE}/register`, this.passport.authenticate("local-signup", {
      successRedirect: "/users/success",
      failureRedirect: "/users/failure",
      failureFlash: true
    }))
    app.get(`${ROUTE_BASE}/success`, this.success.bind(this))
    app.get(`${ROUTE_BASE}/failure`, this.failure.bind(this))

  }
  configurePassport(){
    this.passport.use("local-signup", new this.LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    }, async (req, username, password, done) => {
      const newUser = {
        username,
        password
      }
      const a = this.UserService.testService(newUser)
    }))
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  probando(req, res) {
    console.log("Controller User");
    res.sendStatus(200)
    this.UserService.testService();
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  user(req, res){
    
    res.sendStatus(200)
  }

  success(req, res){
    console.log("success")
    res.sendStatus(200)
  }

  failure(req, res){
    console.log("failure")
    res.sendStatus(200)
  }


}

module.exports = UserController;
