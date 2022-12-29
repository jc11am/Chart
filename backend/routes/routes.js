const express = require("express")
const router = express.Router()
const {userAuth} = require ("../middleware/userAuth")
const { accessChat,
        fetchChat,
        createGroupChat,
        renameGroup,
        addGroup,
        removeGroup
} = require("../controllers/chatControllers")

router.get("/",userAuth, fetchChat )
router.post("/",userAuth, accessChat )
router.post("/group",userAuth, createGroupChat )
router.put("/rename",userAuth, renameGroup )
router.put("/remove",userAuth, removeGroup )
router.put("/addgroup",userAuth, addGroup )

module.exports = router;