const express = require("express");
let app = express()
const PersonModel = require("./personModel");
const bodyParser = require("body-parser");
const cors = require("cors");
PORT = 3001

app.use(bodyParser.text({ type: "text/plain" })); //for recieving unformatted string bodies.

app.engine('.ejs', require('ejs').__express); //set template engine
app.set('views', __dirname + '/views') //set a directory to look for views
app.use(express.static(__dirname + '/views')) // middleware that serves static files from a directory
app.use(cors());

app.get("", (req, res) => {
    PersonModel.find().then(function (found) {
        res.render("index.ejs", { msg: `amount of people in DB: ${found.length}` }) //need .ejs to specify engine
    }).catch((err) => {
        res.render("index.ejs", { msg: `${err}` })
    })
})


app.get("/get", function (req, res) {
    PersonModel.find({ name: req.query.name }, { '_id': 0 }).exec().then(function (found) {
        res.status(200).send(JSON.stringify(found));
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post("/post", (req, res) => {
    if (req.body.length < 1) {
        res.send("please provide a name of atleast 1 character")
    } else {
        const person = new PersonModel({ name: req.body });
        person.save(function (err) {
            if (err) res.send("something went wrong!");
            res.send(`${req.body} is created.`)
        });
    }
})

app.post("/put", (req, res) => {
    if (req.body.length < 1) {
        res.send("please provide a name of atleast 1 character")
    } else {
        const {originalValue, updatedValue} = JSON.parse(req.body);
        PersonModel.findOneAndUpdate({ name: originalValue }, { $set: { name: updatedValue } }, { new: true }, (err, doc) => {
            if (err) {
                res.end("something went wrong, perhaps the user did not exist!")
            }
            res.send(`${originalValue} is now changed. ${doc} is updated`)
        });
    }
})

app.post("/delete", (req, res) => {
    PersonModel.remove({name: req.body}, function(err, countRemoved){
        if(countRemoved === 0 || err){
            res.send("zero documents removed")
        } else {
            res.send("succesfully removed document!")
        }
    })

})

app.listen(PORT)

module.export = app;