const express = require("express");
let app = express()
const PersonModel = require("./personModel");
const bodyParser = require("body-parser");
const cors = require("cors");
PORT = 3001

app.use(bodyParser.json()); //for recieving unformatted string bodies.
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
    if (req.body.name < 1) {
        res.status(203).send("please provide a name, with more than one character")
    } else {
        const {name} = req.body;
        const person = new PersonModel({ name: name });
        person.save(function (err) {
            if (err) res.status(500).send("something went wrong!")
            else {
                res.status(201).send(`${name} is created.`)
            }
        });
    }
})

app.put("/put", (req, res) => {
    const {originalValue, updatedValue} = req.body;
    if (!req.body.originalValue || !req.body.updatedValue) {
        res.send("name or update value is not defined")
    } else {
        const {originalValue, updatedValue} = req.body;
        PersonModel.findOneAndUpdate({ name: originalValue }, { $set: { name: updatedValue } }, { new: true }, (err, doc) => {
            if (err || doc === null) {
                res.status(203).send("something went wrong, perhaps the user did not exist!")
            } else {
                res.status(201).send(`${originalValue} is now changed. name is now ${updatedValue}`)
            }
            
        });
    }
})


app.delete("/delete", (req, res) => {
    const {name} = req.body;
    PersonModel.deleteOne({name:name}, function(err, countRemoved){
        if(err){
            res.status(400).send("bad request")
        }else {
            if(countRemoved === 0){
                res.status(200).send("zero documents removed")
            } else {
                res.status(200).send("succesfully removed!")
            }
        }

    })
})



app.listen(PORT)

module.exports = app;