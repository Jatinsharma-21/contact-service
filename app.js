const express = require('express');         // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const dotenv = require('dotenv');          // Import dotenv to manage environment variables
const connectDB = require('./config/database'); // Import the function to connect to the MongoDB database
const { identify } = require('./controllers/identifyController'); // Import the identify controller function

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

// Define the route for the /identify endpoint and associate it with the identify controller function
app.post('/identify', identify);

// Define the port on which the server will listen. Default to 3000 if not specified in the environment variables.
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
});
