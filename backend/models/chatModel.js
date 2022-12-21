const mongoose = require("mongoose")
const chats = require("../data/data")

const chatSchema = mongoose.Schema({
    chatName:{
        type: String,
        trim: true
    },
    isGroupChat:{
        type: Boolean,
        default: false
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUser",
    },],
    lastestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatUser"
    },
},
{
    timestamps: true,
}
)

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat;