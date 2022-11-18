const mongoose = require('mongoose');
/**
const URI = process.env.MONGO_URI;

mongoose.connect(URI, () => {
    console.log(`Database Connection Successfull`);
})
**/

function connectDB(URI) {
    return mongoose.connect(URI)
}

module.exports = connectDB;
