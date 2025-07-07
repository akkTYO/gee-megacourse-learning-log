// LST DOY Timeseries Plot using MODIS LST Data

// 1. Load MODIS Land Surface Temperature (LST) data
var collection = ee.ImageCollection("MODIS/061/MOD11A2")
  .select("LST_Day_1km")  // Use only daytime LST band
  .filterDate("2019-01-01", "2023-08-31")
  .filterBounds(roi);     // ROI = region of interest

// 2. Convert LST from Kelvin*50 to Celsius
var LSTDay = collection.map(function(img){
  return img
    .multiply(0.02)           // Convert to Kelvin
    .subtract(273.15)         // Convert to Celsius
    .copyProperties(img, ["system:time_start", "system:time_end"]); // Preserve timestamp
});

// 3. Create annual Day-of-Year (DOY) timeseries chart
var chart = ui.Chart.image.doySeriesByYear({
  imageCollection: LSTDay,
  bandName: "LST_Day_1km",
  region: roi,
  reducer: ee.Reducer.mean(),
  scale: 1000
});

print(chart);
