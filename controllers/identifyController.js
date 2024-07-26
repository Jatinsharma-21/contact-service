const { findOrCreateContact } = require('../services/contactService');

// Controller function to handle the /identify endpoint
async function identify(req, res) {
  // Destructure email and phoneNumber from the request body
  const { email, phoneNumber } = req.body;

  // Validate that at least one of email or phoneNumber is provided
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'email or phoneNumber is required' });
  }

  try {
    // Call the service function to find or create a contact with the provided email and phoneNumber
    const contact = await findOrCreateContact({ email, phoneNumber });
    
    // Send a success response with the contact information
    res.status(200).json(contact);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Export the identify function for use in routing
module.exports = {
  identify,
};
