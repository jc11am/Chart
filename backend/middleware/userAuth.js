const jwt = require("jsonwebtoken")
const Chatuser = require("../models/userModel")

const userAuth = async function(req, res, next){
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: " Not authenticated"})
    }

    const token = authorization.split(" ")[ 1 ];

    try {
        const {_id} =  jwt.verify(token, process.env.Secret);
        req.user = await Chatuser.findById({_id}).select("-password");
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Not authenticated"})
    }
}

module.exports = {userAuth}