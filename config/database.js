const mongoose = require('mongoose');

// Function to connect to MongoDB using Mongoose
async function connectDB() {
  try {
    // Attempt to connect to MongoDB using the connection URI stored in the environment variable
    await mongoose.connect(process.env.MONGODB_URI, {
      // Options to ensure compatibility with new URL parser and unified topology
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Log a success message once connected
    console.log('MongoDB connected...');
  } catch (err) {
    // Log an error message if the connection fails
    console.error('MongoDB connection error:', err.message);
    
    // Exit the process with a non-zero code to indicate failure
    process.exit(1);
  }
}

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
