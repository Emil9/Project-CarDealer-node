const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Car = require("../models/car");

mongoose.set('useCreateIndex', true) //usuwa zbędny komunikat

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "./uploads/");
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString().replace(':','_').replace(':','_') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true) 
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024*5},
    fileFilter: fileFilter
});

router.get("/", (req,res,next)=>{
    Car.find().exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err =>res.status(500).json({error: err}));
});

router.post("/", upload.single("carImage"), (req,res,next)=>{
    console.log(req.file);
    const car = new Car({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        carImage: req.file.path
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

router.patch("/:carId", checkAuth, (req,res,next)=>{
    const id = req.params.carId;
    console.log(req.file);
    Car.update({_id:id}, 
        {$set:{
            name: req.body.name,
            price: req.body.price
        }}
        ).exec()
    .then(newCar => res.status(200).json(newCar))
    .catch(err => res.status(500).json({error:err}));
});

router.delete("/:carId", (req,res,next)=>{
    const id = req.params.carId;
    Car.remove({_id:id}).exec()
    .then(result => res.status(200).json({message: "Samochód został kupiony"}))
    .catch(err => res.status(500).json({error:err}));
});

module.exports = router;