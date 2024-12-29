mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinates, // Set to the coordinates from the listing
  zoom: 11, // starting zoom
});

// Create a marker for the listing location
const marker = new mapboxgl.Marker()
  .setLngLat(coordinates) // Use the coordinates from the listing
  .addTo(map);
