 
const mongoose = require("mongoose");

/* 2. Use process.env.MONGODB_URI instead of the hardcoded string */
/* process.env.MONGODB_URI || */
const mongoURI = "mongodb://localhost:27017/jwt_db";
mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log(`MongoDB connection error: ${error}`);
});

module.exports = mongoose;