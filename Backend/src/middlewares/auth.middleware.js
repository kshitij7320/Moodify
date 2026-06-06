const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }
    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    req.user = decoded

    next()
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    
}

module.exports = { authUser }