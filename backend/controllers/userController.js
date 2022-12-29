const Chatuser = require("../models/userModel")
const jwt = require ("jsonwebtoken")

const createToken = function(_id){
    return jwt.sign({_id}, process.env.Secret, {  expiresIn: "3d" })
}

//login user
const loginUser = async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await Chatuser.login( email, password )
        const token = await createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(404).json({ error: error.message })
    }


}

//register user
const registerUser = async function(req, res){
    const { name, email, password, pic } = req.body;

    try {
        const user = await Chatuser.signup( name,  email,  password, pic )
        const token = await createToken(user._id)
        res.status(200).json({name, email, pic ,token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const allUser = async function(req, res){
    const keyword = req.query.search
        ? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}},
            ],
        }
        : {};
        const users = await Chatuser.find(keyword).find({ _id: {
            $ne: req.user._id
        } });
        res.send(users);
}

module.exports = {
    loginUser,
    registerUser,
    allUser
}