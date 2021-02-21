const AbstractError = require("./abstractController.js");

module.exports = class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractError("AbstractController cannot be instanced");
    }
  }
};
