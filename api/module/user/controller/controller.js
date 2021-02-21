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
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  probando(req, res) {
    res.send("Controller User");
    this.UserService.testService();
  }
}

module.exports = UserController;
