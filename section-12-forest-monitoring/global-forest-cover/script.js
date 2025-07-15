// Load annual forest/non-forest classification from JAXA's ALOS/PALSAR
var dataset = ee.ImageCollection("JAXA/ALOS/PALSAR/YEARLY/FNF")
  .filterDate("2017-01-01", "2018-01-01");

// Select the "fnf" band: Forest / Non-forest classification
var forestNonForest = dataset.select("fnf");

// Define visualization parameters
var forestNonForestVis = {
  min: 1.0,
  max: 3.0,
  palette: ["006400", "FEFF99", "0000FF"],  // Green: Forest, Yellow: Non-forest, Blue: Water
};

// Display result on the map
Map.addLayer(forestNonForest, forestNonForestVis, "Forest/Non-Forest");
