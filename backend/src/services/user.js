const User = require("../models/user");

const getUsers = async (req, res) => {
  const users = await User.find({});
  return users;
};

const getUserById = async (userId) => {
    try {
        // Find user and exclude password field
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = { getUsers,getUserById };
