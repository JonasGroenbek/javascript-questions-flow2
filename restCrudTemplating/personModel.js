const mongoose = require("./db");
const Schema = mongoose.Schema;

const PersonModel = mongoose.model('persons', new Schema(
    {
        name: String,
    }
));

module.exports = PersonModel;

