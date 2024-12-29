const Listing = require("../Models/listing");
const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not Exist!");
    res.redirect("/listings");
    return;
  }

  // Get coordinates for map
  const coordinates = listing.geometry.coordinates;

  res.render("listings/show.ejs", { listing, coordinates });
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
    const imageUrl = req.body.listing.imageUrl || "";

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
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid Data for Listing");
  }

  let { id } = req.params;

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
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
