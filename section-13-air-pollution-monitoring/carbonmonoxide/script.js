// Air Pollution Monitoring - Carbonmonoxide

// Load Sentinel-5P TROPOMI image collection and select CO band
var collection = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CO")
  .select("CO_column_number_density") // Tropospheric CO concentration
  .filterDate("2024-01-01", "2024-02-01") // Filter for January 2024
  .mean(); // Aggregate daily images to monthly average

// Define visualization parameters
var band_viz = {
  min: 0,
  max: 0.05,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};

// Add layer to map
Map.addLayer(collection, band_viz, "SSP CO");

// Set map center (Africa region)
Map.setCenter(25, 4);
