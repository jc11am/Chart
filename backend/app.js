require("dotenv").config()
const express = require("express")
const routes = require("./routes/routes")
const userroutes = require("./routes/userRoute")
const mongoose = require("mongoose")
const app = express()

//middleware
app.use(express.json())

//Routes
app.use("/api/user", userroutes )
app.use("/api/chat", routes )


const PORT = process.env.Port

mongoose.set("strictQuery", true)

mongoose.connect(process.env.Database)
    .then(function(){
        app.listen(PORT || 4000, function(){
            console.log("success")
        })
    })
    .catch(function(error){
        console.log(error.message)
    })
