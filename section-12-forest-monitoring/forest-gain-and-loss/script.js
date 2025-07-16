// Forest Gain and Loss

// Load national boundary of Gabon
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("country_na", "Gabon"));

// Load Hansen tree cover dataset (v1.12, 2000–2024)
var dataset = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");

// Select gain and loss bands
var loss = dataset.select(["loss"]);
var gain = dataset.select(["gain"]);

// Visualize the loss layer in red (where loss = 1)
Map.addLayer(loss.clip(roi).updateMask(loss), {palette: ["red"]}, "Forest Loss");

// Visualize the gain layer in blue (where gain = 1)
Map.addLayer(gain.clip(roi).updateMask(gain), {palette: ["blue"]}, "Forest Gain");

// Overlay Gabon's boundary in grey
Map.addLayer(
  ee.Image().paint(roi, 0, 1),
  {palette: ["grey"]},
  "Gabon");

// Center map on Gabon
Map.centerObject(roi, 8);
