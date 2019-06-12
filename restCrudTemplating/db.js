const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://jonasgroenbek:2800jonas@gettingstarted-upvoz.mongodb.net/FLOW-2?retryWrites=true&w=majority', {useNewUrlParser: true})
.then( () => {
    console.log("database is connected!")
}, err => {
    console.log(err)
})

module.exports = mongoose;