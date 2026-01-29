const User = require("../models/user");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users)
  return users;
};

module.exports = { getUsers };
