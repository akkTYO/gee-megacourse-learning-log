// Air Pollution Monitoring - Methane
// This script visualizes methane (CH4) concentration using Sentinel-5P TROPOMI data

// Load Sentinel-5P methane data collection and select the CH4 column volume mixing ratio
var ch4 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_CH4")
.select("CH4_column_volume_mixing_ratio_dry_air")  // Select methane concentration band
.filterDate("2024-01-01", "2024-02-01")           // Filter for January 2024 data
.mean()                                           // Calculate mean across all images in the collection
.rename("ch4");                                   // Rename the band for clarity

// Define visualization parameters for methane concentration
var band_viz = {
  min: 1800,                                      // Minimum value for visualization (ppb)
  max: 1900,                                      // Maximum value for visualization (ppb)
  palette: ["black", "blue", "yellow", "red"]    // Color palette: low (black/blue) to high (yellow/red)
};
  
// Add the methane layer to the map with visualization parameters
Map.addLayer(ch4, band_viz, "CH4");              // Display layer with name "CH4"
