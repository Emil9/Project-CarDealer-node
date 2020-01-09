const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    days: Number
});

module.exports = mongoose.model("Rental", rentalSchema);