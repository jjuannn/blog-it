const AbstractController = require("../abstract/abstractController")
const AbstractControllerError = require("../error/abstractError")

test("abstract controller cannot be instanced", async() => {
    let controller
    try {
        controller = new AbstractController()
    } catch (err) {
        expect(err).toBeInstanceOf(AbstractControllerError)
    }
    expect(controller).toBeUndefined()
})

test("extends abstract class correctly", async() => {
    const controller = class Controller extends AbstractController{}
    expect(new controller()).toBeInstanceOf(AbstractController)
})