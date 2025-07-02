// Advanced Cloud Masking - GEE

// 1. Define region of interest (ROI) - Uganda
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
             .filter(ee.Filter.eq("country_na", "Uganda"));

// 2. Cloud mask function using QA_PIXEL bitmask
function cloudmask(image) {
  // QA_PIXEL contains bitwise flags indicating cloud conditions
  // Bit 3 = Cloud (value 8), Bit 4 = Cloud Shadow (value 16)
  var qa = image.select("QA_PIXEL");

  // bitwiseAnd checks the presence of these bits
  var mask = qa.bitwiseAnd(1 << 3).eq(0)    // Cloud-free pixels
              .and(qa.bitwiseAnd(1 << 4).eq(0)); // Cloud shadow-free

  return image.updateMask(mask);
}

// 3. Apply scale factors to surface reflectance (optical & thermal)
function applyScaleFactors(image){
  var opticalBands = image.select("SR_B.").multiply(0.0000275).add(-0.2);
  var thermalBands = image.select("ST_B.*").multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}

// 4. Load and filter Landsat 8 imagery for 2022 over Uganda
var l8collection = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
  .filterDate("2022-01-01", "2023-01-01")
  .filterBounds(roi);

// 5. Create median composites
var rawComposite = l8collection.map(applyScaleFactors).median();
var cloudFreeComposite = l8collection.map(cloudmask)
                                     .map(applyScaleFactors)
                                     .median();

// 6. Visualization parameters
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ["SR_B4", "SR_B3", "SR_B2"] // Natural color composite
};

// 7. Display the result
Map.centerObject(roi, 7);
Map.addLayer(rawComposite.clip(roi), rgbVis, "Raw Composite");
Map.addLayer(cloudFreeComposite.clip(roi), rgbVis, "Cloud-Free Composite");
