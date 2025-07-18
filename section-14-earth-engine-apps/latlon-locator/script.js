// LatLon Locator App

// Create UI title label
var title = ui.Label({
  value: "Click on the Map",
  style: {fontSize: "20px"}
});

// Create empty labels for latitude and longitude display
var lon = ui.Label();
var lat = ui.Label();

// Combine labels into a side panel
var sidebar = ui.Panel({
  widgets: [title, lat, lon],
  style: {width: "250PX"}
});

// Add the panel to the left of the map
ui.root.add(sidebar);

// Define map click event
Map.onClick(function(coords) {
  // Update label values with coordinates
  lon.setValue("lon" + coords.lon);
  lat.setValue("lat" + coords.lat);
  
  // Create a red point geometry at the clicked location
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: "FF0000"}, "Last Click");

  // Show the red point as the 2nd layer on the map
  Map.layers().set(1, dot);
});
