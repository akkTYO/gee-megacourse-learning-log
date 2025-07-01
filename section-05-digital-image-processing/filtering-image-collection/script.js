// Filtering Image Collection

// 1. Define Region of Interest (ROI)
var roi = ee.Geometry.Point([30.68, -1.195]);

// 2. Define scale factor function for Landsat imagery
function applyscaleFactors(image){
  var opticalBands = image.select("SR_B.").multiply(0.0000275).add(-0.2);
  var thermalBands = image.select("SR_B.*").multiply(0.00341802).add(-149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}

// 3. Load Landsat 9 image collection and apply scaling
var l9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
  .map(applyscaleFactors);

print("Before filtering:", l9.size());

// 4. Filter by metadata, date, and location
var filtered = l9
  .filterMetadata("CLOUD_COVER", "less_than", 10)
  .filter(ee.Filter.date("2022-01-01", "2022-03-01"))
  .filter(ee.Filter.bounds(roi));

print("After filtering:", filtered.size());
