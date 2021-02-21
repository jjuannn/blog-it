const AbstractError = require("../error/abstractError.js");

module.exports = class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new AbstractError("AbstractRepository cannot be instanced");
    }
  }
};
