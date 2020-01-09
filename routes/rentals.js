const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Rental = require("../models/rental");

router.get("/", (req,res,next)=>{
    Rental.find().exec()
    .then(docs => res.status(200).json(docs))
    .catch(err =>res.status(500).json({error: err}));
});

router.post("/", (req,res,next)=>{
    const rental = new Rental({
        _id: new mongoose.Types.ObjectId(),
        days: req.body.days
    });
    rental.save()
    .then(result => {
        res.status(201).json({
            message: "Wypożyczono samochód",
            createdRental: rental
        });
    })
    .catch(err =>res.status(500).json({error:err}));
});

router.get("/:rentalId", (req,res,next)=>{
    const id = req.params.rentalId;
    Rental.findById(id).exec()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json({error:err}));
});
