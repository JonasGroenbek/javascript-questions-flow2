const express = require("express")
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('.ejs', require('ejs').__express); //set template engine
app.set('views', __dirname + '/views') //set a directory to look for views
app.use(express.static(__dirname + '/views')) // middleware that serves static files from a directory

app.get("", (req, res) => {
    res.render("index.ejs", {msg: ""})
})
app.post("", (req, res) => {
    const {greeting} = req.body;
    res.render("index.ejs", {msg: greeting})
})

app.listen(3000, () => {

})