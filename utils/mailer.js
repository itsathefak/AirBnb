const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or App Password
  },
});

// Function to send a welcome email
const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: `"Stay Luxe" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Stay Luxe!",
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
            .main-content h2 {
              font-size: 28px;
              color: #fe424d;
              margin-top: 0;
            }
            .image-container {
              display: flex;
              justify-content: space-between;
              gap: 15px;
              margin-top: 20px;
            }
            .image-container img {
              width: 48%;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
            .footer p {
              margin: 5px 0;
            }
            .social-icons {
              margin-top: 15px;
            }
            .social-icons a {
              margin: 0 10px;
              font-size: 20px;
              color: #fe424d;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Stay Luxe!</h1>
              <p>Your gateway to luxurious and unforgettable travel experiences.</p>
            </div>

            <div class="main-content">
              <h2>Thank You for Subscribing!</h2>
              <p>We are thrilled to have you join our exclusive community of luxury travelers. Get ready to explore the world’s most luxurious stays and experiences, all curated just for you.</p>

              <div class="image-container">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Luxurious Villa">
                <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Exotic Destination">
              </div>

              <p>Discover breathtaking villas, exotic destinations, and VIP experiences designed to make your travel dreams come true.</p>
              <a href="https://stayluxe.onrender.com/listings" class="cta-button">Explore Our Listings</a>


            <div class="footer">
              <p>&copy; 2024 Stay Luxe Private Limited | All Rights Reserved</p>
              <p>If you no longer wish to receive our emails, you can <a href="https://stayluxe.com/unsubscribe">unsubscribe here</a>.</p>
              <div class="social-icons">
                <a href="https://facebook.com/stayluxe" target="_blank">Facebook</a>
                <a href="https://twitter.com/stayluxe" target="_blank">Twitter</a>
                <a href="https://instagram.com/stayluxe" target="_blank">Instagram</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };
