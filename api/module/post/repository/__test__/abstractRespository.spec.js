const AbstractError = require("../error/abstractError")
const AbstractRepository = require("../abstractRepository/abstractRepository")

test("abstract repository cannot be instanced", () => {
    let abstractInstance 
    try {
        abstractInstance = new AbstractRepository()
    } catch (err) {
        expect(err).toBeInstanceOf(AbstractError)
    }
    expect(abstractInstance).toBeUndefined()
})

test("creates a instance correctly", () => {
    const Repository = class Repository extends AbstractRepository{}
    expect(new Repository()).toBeInstanceOf(AbstractRepository)
})