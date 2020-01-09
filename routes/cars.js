const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/car");

router.get("/", (req,res,next)=>{
    Car.find().exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>res.status(500).json({error: err}));
});

router.post("/", (req,res,next)=>{
    console.log(req.file);
    const car = new Car({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    car.save()
    .then(result => {
        res.status(201).json({
            message: "Dodano nowy samochód",
            createdCar: car
        });
    })
    .catch(err =>res.status(500).json({error:err}));
});

router.get("/:carId", (req,res,next)=>{
    const id = req.params.carId;
    Car.findById(id).exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error:err}));
});

module.exports = router;