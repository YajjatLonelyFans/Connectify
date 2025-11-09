const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userControllers.js");

const { protect } = require("../Middleware/authMiddleWare.js");

router.post("/signup", userController.registerUser);          
router.post("/login", userController.loginUser);              
router.get("/profile", protect, userController.getProfile)
router.put("/edit", protect, userController.editUser);        

module.exports = router;
