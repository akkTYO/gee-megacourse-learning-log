// Forest Gain and Loss Area Calculation

// Load national boundary of Gabon
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("country_na", "Gabon"));

// Load Hansen tree cover dataset (v1.12, 2000–2024)
var dataset = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");

// Select gain and loss bands
var loss = dataset.select(["loss"]);
var gain = dataset.select(["gain"]);

// Multiply by pixel area to convert binary mask to area (sq meters)
var areaLoss = loss.multiply(ee.Image.pixelArea());
var areaGain = gain.multiply(ee.Image.pixelArea());

// Calculate the area of loss pixels in Gabon
var lossStats = areaLoss.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi.geometry(),
  scale: 30,
  maxPixels: 1e11
});
print("Area lost in Gabon", lossStats.get("loss"), "square meters");

// Calculate the area of gain pixels in Gabon
var gainStats = areaGain.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi.geometry(),
  scale: 30,
  maxPixels: 1e11
});
print("Area gain in Gabon", gainStats.get("gain"), "square meters");

// Display the data
Map.addLayer(ee.Image().paint(roi, 0, 1), {palette: ["grey"]}, "Gabon");
Map.centerObject(roi, 7);

// Display Forest Gain & Loss
Map.addLayer(loss.clip(roi).updateMask(loss), {palette: ["red"]}, "Forest Loss");
Map.addLayer(gain.clip(roi).updateMask(gain), {palette: ["blue"]}, "Forest Gain");
