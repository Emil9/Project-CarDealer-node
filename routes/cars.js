const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/car");

router.get("/", (req,res,next)=>{
    Car.find().exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>res.status(500).json({error: err}));
});