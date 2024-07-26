const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Contact model
const contactSchema = new Schema({
  // Phone number of the contact
  phoneNumber: {
    type: String,              // The data type is a string
    required: false,           // This field is optional
  },
  
  // Email address of the contact
  email: {
    type: String,              // The data type is a string
    required: false,           // This field is optional
  },
  
  // Reference to another contact, used for linking
  linkedId: {
    type: Schema.Types.ObjectId,  // The data type is an ObjectId
    ref: 'Contact',               // Refers to the Contact model itself
    required: false,              // This field is optional
  },
  
  // Determines if this contact is a primary or secondary contact
  linkPrecedence: {
    type: String,                // The data type is a string
    enum: ['primary', 'secondary'], // Only 'primary' or 'secondary' are valid values
    default: 'primary',          // Default value is 'primary'
  },
  
  // Timestamp for when the contact was created
  createdAt: {
    type: Date,                  // The data type is a Date
    default: Date.now,           // Default value is the current date and time
  },
  
  // Timestamp for when the contact was last updated
  updatedAt: {
    type: Date,                  // The data type is a Date
    default: Date.now,           // Default value is the current date and time
  },
  
  // Timestamp for when the contact was deleted
  deletedAt: {
    type: Date,                  // The data type is a Date
    required: false,             // This field is optional
  },
});

// Create a model using the contact schema
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model for use in other parts of the application
module.exports = Contact;
