const Contact = require('../models/contact');

// Function to find an existing contact or create a new one
async function findOrCreateContact({ email, phoneNumber }) {
  // Start a new MongoDB session for transaction support
  const session = await Contact.startSession();
  session.startTransaction();

  try {
    // Find existing contacts with the given email or phoneNumber
    const existingContacts = await Contact.find({
      $or: [{ email }, { phoneNumber }],
    }).session(session);

    // If no existing contacts are found, create a new primary contact
    if (existingContacts.length === 0) {
      const newContact = new Contact({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
      });
      await newContact.save({ session });

      // Commit the transaction and end the session
      await session.commitTransaction();
      session.endSession();

      // Return the formatted response for the new contact
      return formatResponse(newContact);
    }

    // Separate the primary contact and secondary contacts from the existing contacts
    const primaryContact = existingContacts.find(contact => contact.linkPrecedence === 'primary');
    const secondaryContacts = existingContacts.filter(contact => contact.linkPrecedence === 'secondary');

    let response = formatResponse(primaryContact, secondaryContacts);

    // If no primary contact is found, create a new primary contact and update secondary contacts
    if (!primaryContact) {
      const newPrimaryContact = new Contact({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
      });
      await newPrimaryContact.save({ session });

      // Update secondary contacts to link to the new primary contact
      await Promise.all(secondaryContacts.map(contact => 
        Contact.updateOne(
          { _id: contact._id },
          { $set: { linkedId: newPrimaryContact._id, linkPrecedence: 'secondary' } },
          { session }
        )
      ));

      // Update the response with the new primary contact and existing secondary contacts
      response = formatResponse(newPrimaryContact, secondaryContacts);
    } else {
      // Create a new secondary contact linked to the existing primary contact
      const newSecondaryContact = new Contact({
        email,
        phoneNumber,
        linkedId: primaryContact._id,
        linkPrecedence: 'secondary',
      });
      await newSecondaryContact.save({ session });

      // Add the new secondary contact ID to the response
      response.secondaryContactIds.push(newSecondaryContact._id);
    }

    // Commit the transaction and end the session
    await session.commitTransaction();
    session.endSession();

    // Return the formatted response with the updated contact information
    return response;
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Helper function to format the response
function formatResponse(primary, secondaries = []) {
  return {
    primaryContactId: primary._id,
    emails: [primary.email, ...secondaries.map(c => c.email)],
    phoneNumbers: [primary.phoneNumber, ...secondaries.map(c => c.phoneNumber)],
    secondaryContactIds: secondaries.map(c => c._id),
  };
}

// Export the function for use in other modules
module.exports = {
  findOrCreateContact,
};
