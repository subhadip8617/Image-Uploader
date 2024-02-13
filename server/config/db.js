const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected! ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection issue: ${error}`);
    }
}

module.exports = connectDB;