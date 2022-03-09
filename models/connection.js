require('dotenv').config();
const mongoose = require('mongoose');

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////

const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG  = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events Open/Disconnect/Errors
mongoose.connection
    .on("open", () => console.log("Connected."))
    .on("close", () => console.log('Connection closed.'))
    .on("error", (error) => console.log(error));

module.exports = mongoose;