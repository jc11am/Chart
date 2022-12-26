const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    pic: {
        type: String,
        default: 
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
},
{
    timestamps: true,
}
)

userSchema.statics.login = async function( email, password ){
    if(!email || !password) {
        throw Error("All fields are required")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect Credentials")
    }
    const compare =  await bcrypt.compare(password, user.password)
    if(!compare){
        throw Error ("Incorrect Credentials")
    }

    return user
}

userSchema.statics.signup = async function( name, email, password, pic ){
    if(!name || !email || !password ) {
        throw Error ("All fields are required")
    }

    if(!validator.isEmail(email)){
        throw Error ("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error ("Password not strong enough")
    }

    const exist = await this.findOne({email})
    if(exist){
        throw Error ("Email already in use")
    }

    const genSalt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, genSalt)

    const user = await this.create({name, email, password: hash, pic })

    return user

} 

const Chatuser = mongoose.model("Chatuser", userSchema)

module.exports = Chatuser;

