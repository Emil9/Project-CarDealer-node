const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    carImage: String
});

module.exports = mongoose.model("Car", carSchema);