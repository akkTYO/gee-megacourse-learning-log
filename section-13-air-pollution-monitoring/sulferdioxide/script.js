// Air Pollution Monitoring - Sulfur Dioxide (SO2)

// This script visualizes sulfur dioxide (SO2) concentration using Sentinel-5P TROPOMI data

// 1. Load country boundaries from LSIB 2017 dataset
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");

// 2. Load Sentinel-5P Level-3 SO2 data for January 2024
var collection = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_SO2")
  .select("SO2_column_number_density")       // Select SO2 column (mol/m²)
  .filterDate("2024-01-01", "2024-02-01")     // Filter for January 2024
  .mean();                                    // Take mean to get monthly average

// 3. Define visualization parameters
var band_viz = {
  min: 0,
  max: 0.0005,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]  // Low to high SO2 levels
};

// 4. Display SO2 concentration clipped to national boundaries
Map.addLayer(collection.clip(countries), band_viz, "SSP SO2");

// 5. Set map view to global scale
Map.setCenter(0.0, 0.0, 2);
