const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const carRouts = require("./routes/cars");
const rentalRouts = require("./routes/rentals");
const userRoutes = require("./routes/users");

mongoose.connect("mongodb+srv://Projekt:"+process.env.ATLAS_PWD+"@projekt-wbv8q.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true});

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/cars", carRouts);
app.use("/users", userRoutes);
app.use("/rentals", rentalRouts);

app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 404);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;