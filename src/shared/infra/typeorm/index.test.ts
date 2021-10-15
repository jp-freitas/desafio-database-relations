import * as index from "@shared/infra/typeorm/index"
// @ponicode
describe("index.default", () => {
    test("0", async () => {
        await index.default("default")
    })

    test("1", async () => {
        await index.default("Edmond")
    })

    test("2", async () => {
        await index.default("Jean-Philippe")
    })

    test("3", async () => {
        await index.default("Pierre Edouard")
    })

    test("4", async () => {
        await index.default("Michael")
    })

    test("5", async () => {
        await index.default("")
    })
})
