const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/handin', { useNewUrlParser: true });
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    age: Number
})

personSchema.statics.create =
    function (person) {
        const self = this;
        return new Promise(function (resolve, reject) {
            const PersonModel = self.model("persons");
            let pers = new PersonModel(person);
            pers.save(function (err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

personSchema.statics.read =
    function (personName) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.model("persons").find({ name: `${personName}` }, function (err, res) {
                resolve(res)
            })
        })
    }
personSchema.statics.update =
    function (id, age) {
        const self = this;
        return new Promise(function (resolve, reject) {
            const newAge = { $set: { age: age } }
            self.model("persons").findByIdAndUpdate(id, newAge, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res)
            })
        })
    }
personSchema.statics.delete =
    function (id) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.model("persons").findOneAndRemove(id, function (err, res) {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }

const PersonModel = mongoose.model("persons", personSchema);


module.exports = PersonModel;