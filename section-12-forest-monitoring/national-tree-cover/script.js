// National Tree Cover

// Load national boundary of Gabon
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("country_na", "Gabon"));

// Load Hansen tree cover dataset
var dataset = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");

// Visualize the treecover2000 band clipped to Gabon
Map.addLayer(
  dataset.clip(roi),
  {bands: ["treecover2000"], palette: ["000000", "00FF00"], max: 100},
  "Gabon Tree Cover"
);

// Overlay Gabon's boundary in red
Map.addLayer(
  ee.Image().paint(roi, 0, 1),
  {palette: ["red"]},
  "Gabon"
);

Map.centerObject(roi, 6);
