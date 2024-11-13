const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type: {
      filename: String,
      url: {
        type: String,
        default:
          "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg",
      },
    },
    default: {
      filename: "defaultImage",
      url: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg",
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
