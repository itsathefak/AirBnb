const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
});

// Function to send a booking confirmation email
const sendBookingConfirmationEmail = async (email, bookingDetails) => {
  const mailOptions = {
    from: `"Stay Luxe" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Booking Confirmation: ${bookingDetails.bookingId}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f1f1f1;
              color: #333;
            }
            .container {
              width: 100%;
              max-width: 700px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #fe424d;
              color: white;
              text-align: center;
              padding: 40px;
              border-radius: 10px 10px 0 0;
            }
            h1 {
              font-size: 36px;
              margin: 0;
            }
            p {
              font-size: 18px;
              line-height: 1.6;
            }
            .cta-button {
              display: inline-block;
              margin: 20px auto;
              padding: 15px 25px;
              background-color: #fe424d;
              color: white;
              font-size: 18px;
              text-decoration: none;
              border-radius: 8px;
              text-align: center;
              font-weight: bold;
              transition: background-color 0.3s ease;
            }
            .cta-button:hover {
              background-color: #c52f3a;
            }
            .main-content {
              padding: 30px;
              text-align: center;
              background-color: #f9f9f9;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              padding: 20px;
              background-color: #f4f4f4;
              border-top: 1px solid #e1e1e1;
            }
            .footer a {
              color: #fe424d;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
              <p>Your booking is confirmed! We can't wait to welcome you.</p>
            </div>

            <div class="main-content">
              <h2>Booking Details</h2>
              <p>Thank you for booking with Stay Luxe! Here are your booking details:</p>
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse; text-align: left;">
                <tr>
                  <td><strong>Booking ID:</strong></td>
                  <td>${bookingDetails.bookingId}</td>
                </tr>
                <tr>
                  <td><strong>Check-in Date:</strong></td>
                  <td>${bookingDetails.checkInDate}</td>
                </tr>
                <tr>
                  <td><strong>Check-out Date:</strong></td>
                  <td>${bookingDetails.checkOutDate}</td>
                </tr>
                <tr>
                  <td><strong>Location:</strong></td>
                  <td>${bookingDetails.location}</td>
                </tr>
                <tr>
                  <td><strong>Total Price:</strong></td>
                  <td>$${bookingDetails.totalPrice}</td>
                </tr>
              </table>

              <p>We look forward to making your stay unforgettable.</p>
              <a href="https://stayluxe.onrender.com/manage-booking" class="cta-button">Manage Your Booking</a>
            </div>

            <div class="footer">
              <p>&copy; 2024 Stay Luxe Private Limited | All Rights Reserved</p>
              <p>If you have any questions, please feel free to <a href="mailto:stayluxe247@gmail.com">contact us</a>.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendBookingConfirmationEmail };
