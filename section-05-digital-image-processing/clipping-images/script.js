// script.js — GEE Clipping Sentinel-2 Imagery

// 1. Load Sentinel-2 Surface Reflectance imagery
var dataset = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")

  // 2. Filter by region of interest (ROI)
  .filterBounds(roi)

  // 3. Filter by cloud coverage metadata (< 20%)
  .filterMetadata("CLOUD_COVERAGE_ASSESSMENT", "LESS_THAN", 20)

  // 4. Filter by date range
  .filterDate("2022-01-01", "2022-06-01")

  // 5. Select only the visible bands for natural color
  .select(["B4", "B3", "B2"])

  // 6. Combine multiple images into a single median composite
  .median();

// 7. Rescale pixel values (divide by 10000 to get reflectance between 0–1)
var rescale = dataset.divide(10000);

// 8. Clip the rescaled image to the ROI boundary
var clipImage = rescale.clip(roi);

// 9. Visualization parameters (RGB composite)
var visParam = {
  bands: ["B4", "B3", "B2"],
  min: 0,
  max: 0.4
};

// 10. Display raw and clipped images on the map
Map.addLayer(rescale, visParam, "Raw Sentinel Image");
Map.addLayer(clipImage, visParam, "Clipped Sentinel Image");
Map.centerObject(roi, 12);
