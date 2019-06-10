const http = require("http");
//const url = "http://localhost:1234/api/scoreboard";

async function get(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, async (res) => {
            const { statusCode } = res;
            if(statusCode !== 200){
                reject("error!")
                return
            }
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                resolve(JSON.parse(body))
            });
        })
    })
}

module.exports = get

