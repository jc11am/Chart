const express = require("express")
const router = express.Router()
const { loginUser, registerUser, allUser } = require("../controllers/userController")
const {userAuth} = require ("../middleware/userAuth")


router.post("/login", loginUser )
router.post("/signup", registerUser )
router.get("/", userAuth, allUser)


module.exports = router;