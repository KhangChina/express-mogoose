const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connect MongoDB Success');
    } catch (err) {
        console.error('❌ Connect MongoDB ERROR:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
