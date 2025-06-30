// script.js - GEE Image Visualization Example
// Based on Udemy Mega Course: Section 5 - Image Visualization

// --- 1. Define Region of Interest (ROI) ---
// This point is located in Utah, USA
var roi = ee.Geometry.Point([-111.2005, 36.1398]);

// --- 2. Load Landsat 9 Image ---
// Select image from Jan–Mar 2022 with the least cloud cover
var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
  .filterDate("2022-01-01", "2022-03-01")   // Filter by date
  .filterBounds(roi)                        // Filter by location
  .sort("CLOUD_COVER")                      // Sort by cloud cover
  .first();                                 // Select the clearest image

// Print the selected image info to the Console
print("Selected Landsat 9 image:", image);

// --- 3. Visualize the Image on the Map ---

// Natural Color (True Color): Red = B4, Green = B3, Blue = B2
Map.addLayer(
  image,
  {
    bands: ["SR_B4", "SR_B3", "SR_B2"],
    min: 0,
    max: 20000
  },
  "True Color (432)"
);

// False Color Composite: NIR = B5, Red = B4, Green = B3
// Useful to highlight vegetation and water
Map.addLayer(
  image,
  {
    bands: ["SR_B5", "SR_B4", "SR_B3"],
    min: 0,
    max: 20000
  },
  "False Color (543)"
);

// Center the map on the selected image
Map.centerObject(image, 8);
