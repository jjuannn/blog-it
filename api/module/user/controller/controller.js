const AbstractController = require("./abstract/abstractController.js");

class UserController extends AbstractController {
  constructor(UserService) {
    super();
    this.UserService = UserService;
    this.ROUTE_BASE = "/users";
  }

  configureRoutes(app) {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(ROUTE_BASE, this.probando.bind(this));
    app.post(ROUTE_BASE, this.user.bind(this))
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
    console.log(req.body)
    res.sendStatus(200)
  }

}

module.exports = UserController;
