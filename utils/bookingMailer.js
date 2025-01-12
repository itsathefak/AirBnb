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
    subject: `Booking Confirmation: ${bookingDetails.title}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Stay Luxe</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f8f8; color: #333333;">
    <div style="width: 100%; max-width: 900px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #fe424d 0%, #ff7b54 100%); color: white; text-align: center; padding: 40px 20px; border-radius: 16px 16px 0 0; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('https://stayluxe.onrender.com/listings/') repeat; opacity: 0.1;"></div>
            <h1 style="font-size: 36px; margin: 0; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">Booking Confirmation</h1>
            <p style="font-size: 18px; margin-top: 10px; font-weight: 300;">Your luxurious getaway awaits!</p>
        </div>

        <div style="padding: 40px 30px; background-color: #ffffff;">
            <h2 style="font-size: 24px; color: #fe424d; text-align: center; margin-bottom: 30px;">Your Booking Details</h2>
            <p style="font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">Thank you for choosing Stay Luxe. We're excited to host you for an unforgettable experience.</p>

            <div style="background-color: #f9f9f9; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
  <img src="${bookingDetails.image}" alt="Listing Image" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

                <table style="width: 100%; border-collapse: separate; border-spacing: 0 10px;">
                    <tr>
                        <td style="font-weight: bold; color: #555555; padding: 8px 0;">Booking Title:</td>
                        <td style="text-align: right;">${bookingDetails.title}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #555555; padding: 8px 0;">Check-in Date:</td>
                        <td style="text-align: right;">${bookingDetails.checkIn}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #555555; padding: 8px 0;">Check-out Date:</td>
                        <td style="text-align: right;">${bookingDetails.checkOut}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #555555; padding: 8px 0;">Location:</td>
                        <td style="text-align: right;">${bookingDetails.location}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; color: #555555; padding: 8px 0;">Total Price:</td>
                        <td style="text-align: right; font-weight: bold; color: #fe424d;">$${bookingDetails.totalPrice}</td>
                    </tr>
                </table>
            </div>

            <p style="font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">We're committed to making your stay extraordinary. If you need anything, our concierge team is always at your service.</p>
            
            <div style="text-align: center;">
                <a href="https://stayluxe.onrender.com/listings/" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #fe424d 0%, #ff7b54 100%); color: white; font-size: 18px; text-decoration: none; border-radius: 50px; font-weight: bold; box-shadow: 0 4px 10px rgba(254, 66, 77, 0.3);">Explore More</a>
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <h3 style="color: #fe424d; font-size: 20px;">Explore Other Luxurious Stays</h3>
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
                    <div style="width: 30%; min-width: 200px; margin: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                        <img src="https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Tropical Villa in Phuket" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                        <h4 style="margin: 0; color: #333;">Tropical Villa in Phuket</h4>
                        <p style="font-size: 14px; color: #666;">Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.</p>
                        <p style="font-size: 16px; color: #fe424d; font-weight: bold;">$3,000/night</p>
                        <p style="font-size: 14px; color: #666;">Phuket, Thailand</p>
                    </div>
                    <div style="width: 30%; min-width: 200px; margin: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                        <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Safari Lodge in the Serengeti" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                        <h4 style="margin: 0; color: #333;">Safari Lodge in the Serengeti</h4>
                        <p style="font-size: 14px; color: #666;">Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.</p>
                        <p style="font-size: 16px; color: #fe424d; font-weight: bold;">$4,000/night</p>
                        <p style="font-size: 14px; color: #666;">Serengeti National Park, Tanzania</p>
                    </div>
                    <div style="width: 30%; min-width: 200px; margin: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px;">
                        <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Beachfront Paradise" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                        <h4 style="margin: 0; color: #333;">Beachfront Paradise</h4>
                        <p style="font-size: 14px; color: #666;">Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.</p>
                        <p style="font-size: 16px; color: #fe424d; font-weight: bold;">$2,000/night</p>
                        <p style="font-size: 14px; color: #666;">Cancun, Mexico</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="background-color: #f4f4f4; text-align: center; padding: 30px 20px; border-top: 1px solid #e1e1e1;">
            <p style="font-size: 14px; color: #777777; margin-bottom: 10px;">&copy; 2024 Stay Luxe Private Limited | All Rights Reserved</p>
            <p style="font-size: 14px; color: #777777; margin-bottom: 20px;">If you have any questions, please feel free to <a href="mailto:stayluxe247@gmail.com" style="color: #fe424d; text-decoration: none;">contact us</a>.</p>

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
