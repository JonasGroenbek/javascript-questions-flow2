const functions = require("../crud/facade");
const express = require("express");
let app = express();
PORT = 3005;
app.listen(PORT)

app.post("/:name/:age", function (req, res) {
    functions.create(req.params.name, req.params.age);
    res.status(201).send();
})

app.get("/:name", function (req, res) {
    functions.read(req.params.name)
    .then(function(person){
        res.status(200).send(JSON.stringify(person));
    })
    .catch(function(error){
        res.status(404).send();
    })
})

app.put("/:id/:age", function (req, res) {
    functions.update(req.params.id, req.params.age);
    res.status(200).send();
})
app.delete("/:id", function (req, res) {
    functions.delete(req.params.id);
    res.status(200).send();
})