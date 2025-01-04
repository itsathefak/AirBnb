# StayLuxe 🏨✨  

**StayLuxe** is a modern luxury booking platform designed to enhance your travel experience. With interactive maps, real-time weather updates, and secure booking, StayLuxe ensures a seamless and premium journey.  

---

## Features  

- 🌐 **Integrated Mapbox**: Visualize your stay's location on an interactive map.  
- 🌦️ **Weather API**: Get real-time weather updates for your travel destination.  
- 🔒 **User Authentication**: Secure login and signup with JWT tokens.  
- 📧 **NodeMailer**: Receive booking confirmations via email.  
- 🏠 **Dynamic Listings**: Explore and book luxurious stays.  
- ⭐ **Reviews & Ratings**: Share your experience and rate accommodations.  
- 📱 **Responsive Design**: Optimized for all devices.  

---

## Technologies Used  

- **Frontend**: EJS, HTML, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **APIs**: Mapbox, OpenWeather API  
- **Other Tools**: NodeMailer, JWT  

---

## Installation  

### Install dependencies:  
```bash  
npm install  

### Set up environment variables:
Create a .env file with:

env
PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
MAPBOX_API_KEY=your_mapbox_api_key  
WEATHER_API_KEY=your_weather_api_key  
EMAIL_USER=your_email  
EMAIL_PASS=your_email_password

Run the project:
bash
npm start

Open your browser at:
http://localhost:8080

### Usage
 - Browse Listings: Find your perfect stay.
- Check Weather: Plan ahead with weather updates.
- Book & Confirm: Secure your stay and receive email confirmation.
- Explore Map: View locations using Mapbox.
- Rate & Review: Share feedback and view ratings for each stay.

###Future Enhancements
💬 Chatbot Integration: Instant support and travel assistance.
- Enhanced filters for personalized search.
- User dashboard for managing bookings.
