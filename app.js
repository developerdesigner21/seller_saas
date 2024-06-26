
const key= "sk_test_51P4uArSGAWrVMb65ONmi15SnVOqwIFiDdpXnO96InxC80zISfMRNaQKUtCGZz1AqG2fkmIvyWfnbDWDWknV946tG00X0ykCmat"
// Import required modules
const express = require('express');
const path = require('path');
const stripe = require('stripe')(key);
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const { query } = require('./database/dbpromise');


// Create an instance of Express
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the path to the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.use(bodyParser.json());

// Define a route
app.get('/', (req, res) => {
  res.render("index");
});

const adminRoute = require('./routes/admin')
app.use('/api/admin', adminRoute)

const userRoute = require('./routes/user')
app.use('/api/user', userRoute)

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
