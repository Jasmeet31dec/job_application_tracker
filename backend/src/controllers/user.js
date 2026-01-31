const userService = require("../services/user");

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: error.message});
  }
}

module.exports = { getUsers };
