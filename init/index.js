const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../Models/listing");
require("dotenv").config({ path: "../.env" });

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

connectDB();

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67461f7a5f28b23a7030e4e4",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
