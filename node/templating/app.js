const express = require("express");
let app = express();
const pug = require('pug');
const PORT = 12345
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('pug', { title: 'Hey', message: 'Hello there!' })
  })

app.listen(PORT, function(){
    console.log(`listening on prot: ${PORT}`)
})

