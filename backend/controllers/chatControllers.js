const Chat = require("../models/chatModel")
const Chatuser = require("../models/userModel")

const accessChat = async function (req, res){
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users:  req.user._id },
        { users:  userId },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await Chatuser.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).send(FullChat);
      } catch (error) {
        res.status(400).json({error: error.message});
      }
    }
  };

const fetchChat = async function(req, res) {
    const { _id } = req.user
    try {
      Chat.find({ users: _id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await Chatuser.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
      res.status(200).json(results)
    })
    } catch (error) {
      res.status(400).json({error: error.message})      
    }
}

//Create Group Chat

const createGroupChat = async function(req, res){
  if(!req.body.users || !req.body.name){
    return res.status(400).json({message: "Please fill all the fields"})
  }

  var users = JSON.parse(req.body.users);
  if(users.length < 2) {
    return res.status(400).json({message: "More than 2 users are required to form a group chat"})
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fetchGroup = await Chat.findOne({_id: groupChat._id})
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fetchGroup);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

//Rename Group
const renameGroup = async function(req, res){
  const { chatId, chatName } = req.body

  const updateChat = await Chat.findByIdAndUpdate(chatId, {
    chatName
  },
  {
    new: true
  })
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updateChat){
    res.status(400).json({message: "Chat not found"})
  }else{
    res.json(updateChat)
  }
}

//Add to group
const addGroup = async function(req, res){
  const { chatId, userId } = req.body

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { 
      $push: { users: userId }
    },
    {
      new: true
    }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added){
      res.status(400).json({message: "Chat Not Found"})
    }else{
      res.json(added)
    }
}

//Remove from group
const  removeGroup = async function(req, res){
  const { chatId, userId } = req.body

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    { 
      $pull: { users: userId }
    },
    {
      new: true
    }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!remove){
      res.status(400).json({message: "Chat Not Found"})
    }else{
      res.json(remove)
    }
}




  module.exports = {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    addGroup,
    removeGroup
  }