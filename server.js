/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); // import morgan
const methodOverride = require("method-override"); // import method override
const fruitController = require('./controllers/fruits');
const path = require("path"); // built in node module we use to resolve paths more on this when we use it

/////////////////////////////////////////////
// App Object Setup
/////////////////////////////////////////////

const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////

app.use(morgan('tiny')); // For debugging / logging
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.use(express.static('public')); 

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

app.use('/fruits', fruitController)
app.get('/', (req, res) => {
    res.send('Server is running!');
});

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
