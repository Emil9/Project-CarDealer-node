const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user")

router.post("/signup", (req, res, next) => {
    User.findOne({email: req.body.email}).exec()
    .then(user => {
        if(user) {
            res.status(409).json({message: "Mail już istnieje"})
        }
        else{
            password: bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if(err) {
                    res.status(500).json({error: err});
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                
                    })
                    user.save()
                    .then(result =>{
                        console.log(result)
                        res.status(201).json({message: "Stworono użytkownika"})
                    })
                    .catch(err => {res.status(500).json({error: err})})
                }
            
            })
        }
    })
    .catch(err => {res.status(500).json({error: err})})
     
});

router.delete("/:userId", (req, res, next) => {
    User.findByIdAndRemove(req.params.userId)
    .exec()
    .then(result => {
        res.status(200).json({message: "Użytkownik został usunięty"})
    })
    .catch(err => {res.status(500).json({error: err})})
})

module.exports = router;