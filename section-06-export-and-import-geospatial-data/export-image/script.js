// script.js — GEE Exporting Sentinel-2 Imagery
// Based on Mega Course Section 5 - Lecture 15

// 1. Load Sentinel-2 Surface Reflectance imagery
var dataset = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")

  // 2. Filter by region of interest (ROI)
  .filterBounds(roi)

  // 3. Filter by cloud coverage metadata (< 20%)
  .filterMetadata("CLOUD_COVERAGE_ASSESSMENT", "LESS_THAN", 20)

  // 4. Filter by date range
  .filterDate("2022-01-01", "2022-06-01")

  // 5. Select visible bands for natural color visualization
  .select(["B4", "B3", "B2"])

  // 6. Reduce cloud impact by computing the median composite
  .median();

// 7. Convert pixel values to reflectance (scaled 0–1)
var rescale = dataset.divide(10000);

// 8. Clip image to region of interest
var clipImage = rescale.clip(roi);

// 9. Visualization settings for RGB display
var visParam = {
  bands: ["B4", "B3", "B2"],
  min: 0,
  max: 0.4
};

// 10. Display on map (for preview)
Map.addLayer(rescale, visParam, "Raw Sentinel Image");
Map.addLayer(clipImage, visParam, "Clipped Sentinel Image");
Map.centerObject(roi, 12);

// 11. Export the clipped image to Google Drive
Export.image.toDrive({
  image: clipImage.visualize(visParam),  // must use visualize() to export RGB image
  description: "Sentinel_Paris",         // filename in Drive (without extension)
  scale: 10,                             // resolution: 10 meters per pixel
  region: roi                            // export bounds
});
