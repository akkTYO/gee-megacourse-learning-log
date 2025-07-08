// Import NLCD Land Cover Data

// 1. Load NLCD ImageCollection (multiple years of land cover products in USA)
var dataset = ee.ImageCollection("USGS/NLCD_RELEASES/2019_REL/NLCD");

// 2. Print available products (each corresponds to a year)
print("Products:", dataset.aggregate_array("system:index"));

// 3. Filter collection to 2001 data
var nlcd2001 = dataset.filter(ee.Filter.eq("system:index", "2001")).first();

// 4. Print available bands (e.g., landcover, impervious, canopy)
print("Bands:", nlcd2001.bandNames());

// 5. Select the impervious surface band and clip to ROI
var impervious = nlcd2001.select("impervious").clip(roi);

// 6. Set visualization parameters (impervious = gray→red)
var visNlcd = {min: 0, max: 100, palette: ["gray", "red"]};

// 7. Display on map
Map.addLayer(impervious, visNlcd, "Impervious");
Map.centerObject(roi);

// 8. Export image to Google Drive
Export.image.toDrive({
  image: impervious.visualize(),
  description: "NLCD_2001_Las_Vegas",
  scale: 30,
  region: roi,
  maxPixels: 1e13
});
