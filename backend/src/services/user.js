const User = require("../models/user");
const JobApplication = require("../models/jobApplication");

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

const deleteUserById = async (userId) => {
    
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('UserNotFound');
    }

    await User.findByIdAndDelete(userId);
    
    await JobApplication.deleteMany({ user: userId });

    return { success: true };
};

module.exports = { getUsers,getUserById,deleteUserById };
