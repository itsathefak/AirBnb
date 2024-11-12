const mongoose = require("mongoose");
const Schema = mongoose.schema();

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg",
    set: (v) =>
      v === ""
        ? "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
modules.export = Listing;
