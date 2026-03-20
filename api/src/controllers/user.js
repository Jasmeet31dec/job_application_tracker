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

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Controller Error:", error.message);
        
        // Handle invalid MongoDB IDs
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid User ID format" 
            });
        }

        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        /*const user = await userService.getUserById(id);
        
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({ message: "Unauthorized action" });
        }*/

        await userService.deleteUserById(userId);

        res.status(200).json({
            success: true,
            message: "User and associated data deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        if (error.message === 'UserNotFound') {
            return res.status(404).json({
                success: false,
                message: "User not found in our records"
            });
        }

        res.status(500).json({
            success: false,
            message: "An internal server error occurred during deletion"
        });
    }
};


module.exports = { getUsers,getUserDetails,deleteUser };
