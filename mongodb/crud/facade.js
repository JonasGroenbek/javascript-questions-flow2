const PersonModel = require("./PersonModel");
let ObjectId = require('mongoose').Types.ObjectId;

functions = {
    create: function (name, age) {
        return PersonModel.create({ name: name, age: age })
    },
    read: function (name) {
        return PersonModel.read(name)

    },
    update: function (id, age) {
        return PersonModel.update(new ObjectId(id), 25)

    },
    _delete: function (id) {
        return PersonModel.delete(new ObjectId(id))
    }
}

module.exports = functions