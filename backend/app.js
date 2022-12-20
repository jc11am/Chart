require("dotenv").config()
const express = require("express")
const routes = require("./routes/routes")
const mongoose = require("mongoose")
const app = express()


app.use("/api/chart", routes )


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
