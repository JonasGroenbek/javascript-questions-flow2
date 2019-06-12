const express = require("express")
const cors = require("cors");
const PORT = 12345;
let app = express();

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

app.use(cors( //sets the origin able to access sites to be localhsot.
    {
        origin: 'http://localhost'
    }
))

app.use('/method', function (req, res, next) { 
    console.log('Request Type:', req.method)
    next()
})

app.get("/param/:arg", function (req, res) {
    res.status(200).send(`you send in${req.params.arg}`)
})

app.listen(PORT, "localhost", function () {
    console.log(`listening on ${PORT}`)
})
