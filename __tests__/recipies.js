//const { it } = require("@jest/globals")
const supertest = require("supertest")
//const { describe } = require("yargs")
const  server = require("../api/server")
const { intersect } = require("../database/dbConfig")
const db = require("../database/dbConfig")

describe("recipe intergration", () => {
    /*it("can get a list of recipies", async () => {

    })*/

    /*it("creates a new recipe", async () => {

    })*/
    
    it("can get a list of recipies", async () => {
        const res = await supertest(server)
            .get("/api/recipies")

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        //expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].id).toBe("1")
    })
})