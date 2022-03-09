const mongoose = require('./connection');

const { Schema, model } = mongoose;

const fruitSchema = new Schema ({
    name: String,
    color: String,
    readyToEat: Boolean,
});

const Fruit = model('fruit', fruitSchema);

module.exports = Fruit;