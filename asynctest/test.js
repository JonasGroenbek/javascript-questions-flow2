
const chai = require("chai")
const expect = require("chai").expect
const get = require("./http");

describe("testing asynchronous http get function", function () {
    it("should return an array, with 3 json objects from an api", async function () {
        const res = await get("http://localhost:1234/api/scoreboard");
        console.log(res)
        expect(res).to.have.lengthOf(3);
    })
})