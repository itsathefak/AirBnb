const Contact = require('../Models/Contact'); // Import the Contact model
const { sendNotificationEmail } = require('../utils/contactMailer'); // Import the function

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Create a new contact form entry
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
        });

        // Save to the database
        await newContact.save();

        // Send notification email
        await sendNotificationEmail({ name, email, subject, message });

        // Send a success response
        res.status(200).json({ message: 'Your message has been sent successfully!' });
    } catch (error) {
        console.error('Error saving contact form or sending email:', error); // Log the error
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
