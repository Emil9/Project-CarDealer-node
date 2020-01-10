const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
    const token = req.headers.autorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    } catch(error){
        return res.status(401).json({message: "Błąd autoryzacji"});
    }

    next();
}