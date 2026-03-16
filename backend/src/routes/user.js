const express = require("express");
const cors = require("cors");
const userController = require("../controllers/user");
const authMiddleware = require("../utils/authMidlleware");

const router = express.Router();

router.use(cors());

router.get("/users", authMiddleware.authenticateToken, userController.getUsers);
router.get("/users/:userId", authMiddleware.authenticateToken, userController.getUserDetails);
router.delete("/delete/:userId", authMiddleware.authenticateToken, userController.deleteUser);

module.exports = router;