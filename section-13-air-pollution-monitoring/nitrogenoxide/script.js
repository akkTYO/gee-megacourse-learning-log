// Air Pollution Monitoring - Nitrogenoxide
// This script visualizes nitrogen dioxide (NO2) concentration using Sentinel-5P TROPOMI data

// Load country boundaries for clipping the data to continental areas
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");

// Load Sentinel-5P Nitrogenoxide data collection and select the Nitrogenoxide column volume mixing ratio
var collection = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2") 
.select("NO2_column_number_density")          // Select NO2 column number density band
.filterDate("2024-01-01", "2024-02-01")      // Filter for January 2024 data
.mean();                                     // Calculate mean across all images in the collection

// Define visualization parameters for Nitrogenoxide concentration
var band_viz = {
  min: 0,                                    // Minimum value for visualization (mol/m²)
  max: 0.0002,                              // Maximum value for visualization (mol/m²)
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]   // Color palette: low (black/blue) to high (yellow/red)
};
  
// Add the methane layer to the map with visualization parameters
Map.addLayer(collection.clip(countries), band_viz, "SSP NO2");  // Clip data to country boundaries and display
Map.setCenter(65, 24, 2);                   // Set map center to coordinates (65°E, 24°N) with zoom level 2
