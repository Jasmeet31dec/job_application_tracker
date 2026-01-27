const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jwt_db");

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log(`MongoDB connection error: ${error}`);
});

module.exports = mongoose;