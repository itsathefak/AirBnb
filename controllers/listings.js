const Listing = require("../Models/listing");
const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const axios = require("axios");
const mapToken = process.env.MAP_TOKEN; // From .env file
const weatherApiKey = process.env.OPENWEATHER_API_KEY; // OpenWeather API Key from .env
const weatherUrl = process.env.OPENWEATHER_URL; // OpenWeather API URL from .env
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    req.flash("error", "Could not fetch listings.");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing does not Exist!");
      return res.redirect("/listings");
    }

    // Get coordinates for map
    const coordinates = listing.geometry.coordinates;

    // Fetch weather information using OpenWeather API
    const weatherResponse = await axios.get(
      `${weatherUrl}?lat=${coordinates[1]}&lon=${coordinates[0]}&units=metric&appid=${weatherApiKey}`
    );
    const weatherData = weatherResponse.data;

    // Extract relevant weather data
    const weather = {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      minTemperature: weatherData.main.temp_min,
      maxTemperature: weatherData.main.temp_max,
      description: weatherData.weather[0].description,
      feelsLike: weatherData.main.feels_like,
      icon: weatherData.weather[0].icon,
    };

    res.render("listings/show.ejs", { listing, coordinates, weather });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    req.flash("error", "Failed to retrieve weather information.");
    res.redirect(`/listings/${id}`);
  }
};

module.exports.createListing = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    // Geocode location to get coordinates
    const geoResponse = await geocodingClient
      .forwardGeocode({ query: req.body.listing.location, limit: 1 })
      .send();

    if (!geoResponse.body.features.length) {
      req.flash("error", "Invalid location. Please try again.");
      return res.redirect("/listings/new");
    }

    const geometry = geoResponse.body.features[0].geometry;

    // If the image URL is provided, use it
    const imageUrl =
      req.body.listing.imageUrl ||
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const newListing = new Listing({
      ...req.body.listing,
      owner: req.user._id,
      image: { url: imageUrl },
      geometry,
    });

    console.log("New Listing Object:", newListing);

    await newListing.save();

    console.log("Listing saved successfully!");
    req.flash("success", "New listing created successfully!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("Error in createListing:", err);
    req.flash("error", "Failed to create listing. Please try again.");
    res.redirect("/listings/new");
  }
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not Exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  } catch (error) {
    console.error("Error fetching listing for edit:", error);
    req.flash("error", "Could not fetch listing for editing.");
    res.redirect("/listings");
  }
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data for Listing");
  }

  let { id } = req.params;

  try {
    // Geocode the new location to get the updated coordinates
    const geoResponse = await geocodingClient
      .forwardGeocode({ query: req.body.listing.location, limit: 1 })
      .send();

    if (!geoResponse.body.features.length) {
      req.flash("error", "Invalid location. Please try again.");
      return res.redirect(`/listings/${id}/edit`);
    }

    const updatedGeometry = geoResponse.body.features[0].geometry;

    // Update the listing with the new location and coordinates
    await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
      geometry: updatedGeometry,
    });

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "Failed to update listing.");
    res.redirect(`/listings/${id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  try {
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error deleting listing:", error);
    req.flash("error", "Failed to delete listing.");
    res.redirect("/listings");
  }
};
