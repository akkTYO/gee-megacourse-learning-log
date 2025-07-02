// script.js — Simple Cloud Masking with Landsat 8
// Based on Mega Course Section 6 - Simple Cloud Masking

// 1. Define the area of interest (AOI) using a single point in West Africa
var aoi = ee.Geometry.Point([-0.2757, 5.7409]);

// 2. Load raw Landsat 8 Level-1 imagery
var l8raw = ee.ImageCollection("LANDSAT/LC08/C02/T1");

// 3. Filter by location and date range
var cloudyImage = l8raw
  .filterBounds(aoi)
  .filterDate("2020-01-01", "2020-12-01");

// 4. Generate a cloud-free composite using simpleComposite()
//    'asFloat: true' rescales DN to reflectance (0–1) and outputs float image
var cloudFree = ee.Algorithms.Landsat.simpleComposite({
  collection: cloudyImage,
  asFloat: true
});

// 5. Define visualization parameters
//    Cloud-free composite uses reflectance values (0–1)
var cloudFreeVis = {
  min: 0,
  max: 0.5,
  bands: ["B4", "B3", "B2"] // Natural color (RGB)
};

//    Raw composite uses DN values (0–30000)
var cloudyVis = {
  min: 0,
  max: 30000,
  bands: ["B4", "B3", "B2"]
};

// 6. Display results
Map.centerObject(aoi, 7);
Map.addLayer(cloudFree, cloudFreeVis, "Cloud-Free Composite");
Map.addLayer(cloudyImage, cloudyVis, "Raw Cloudy Imagery");
