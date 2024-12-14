mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [-80.5204, 43.4643], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 11, // starting zoom
});

console.log(coordinates);

// const marker1 = new mapboxgl.Marker()
//   .setLngLat(coordinates) //listing.geometry.coordinates
//   .addTo(map);
