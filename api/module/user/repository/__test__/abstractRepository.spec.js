const AbstractRepository = require("../abstract/abstractRepository")
const AbstractRepositoryError = require("../error/abstractError")

test("abstractRepository cannot be instanced", () => {
    let repository
    try {
        repository = new AbstractRepository()
    } catch (err) {
        expect(err).toBeInstanceOf(AbstractRepositoryError)
    }
    expect(repository).toBeUndefined()
})

test("creates a instance correctly", () => {
    const repository = class Repository extends AbstractRepository{}
    expect(new repository()).toBeInstanceOf(AbstractRepository)
})