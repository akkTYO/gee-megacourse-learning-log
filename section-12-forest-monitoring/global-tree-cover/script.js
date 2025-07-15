// script.js — Global Tree Cover Map using Hansen Dataset

// Load country boundaries
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");

// Load Hansen Global Forest Change v1.12 dataset (2000–2024)
var dataset = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");

// Add tree cover layer for year 2000, clipped by country boundaries
Map.addLayer(
  dataset.clip(countries),
  {bands: ["treecover2000"], palette: ["000000", "00FF00"], max: 100},
  "Tree Cover"
);

// Add country boundaries overlay in red
Map.addLayer(
  ee.Image().paint(countries, 0, 1),
  {palette: ["red"]},
  "Countries Boundaries"
);

// Set map center
Map.centerObject(dataset, 2);
