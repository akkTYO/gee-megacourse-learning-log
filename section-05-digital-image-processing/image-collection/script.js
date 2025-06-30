// script.js — GEE Landsat 9 Scaling & Visualization
// Based on Mega Course Section 5 - Lecture 11

// Define Scale Factor Function
// This function applies scaling and offset values to both optical and thermal bands
function applyScaleFactors(image) {
  // Optical bands: convert DN to surface reflectance (0.0 – 1.0)
  var opticalBands = image.select("SR_B.").multiply(0.0000275).add(-0.2);

  // Thermal bands: convert DN to temperature in Kelvin (⚠ confirm ST_B10 naming if needed)
  var thermalBands = image.select("ST_B.*").multiply(0.00341802).add(149.0);

  // Merge scaled bands into the original image
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}

// Load and Prepare Image Collection
var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
  .filterDate("2022-01-01", "2023-01-01")
  .map(applyScaleFactors);  // Apply the scale function to every image

// Visualization Parameters
// Display in True Color (B4=Red, B3=Green, B2=Blue)
// Values are scaled reflectance, so we use min/max in float range
var visualization = {
  bands: ["SR_B4", "SR_B3", "SR_B2"],
  min: 0.0,
  max: 0.3
};

// Display the Result on Map
Map.addLayer(image, visualization, "True Color (432)");
