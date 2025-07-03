// Calculate Image Mean using Reducers — GEE

// 1. Define point of interest and buffer it to a 3 km radius
var roi = ee.Geometry.Point(31.76106, -26.73749).buffer(3000);
Map.addLayer(roi, {color: "red"}, "Irrigated Farm");
Map.centerObject(roi);

// 2. Load Sentinel-2 image collection (2019)
var coll = ee.ImageCollection("COPERNICUS/S2_HARMONIZED")
  .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30)) // less cloudy images
  .filter(ee.Filter.date("2019-01-01", "2020-01-01"))
  .filter(ee.Filter.bounds(roi))
  .select("B.*"); // all bands (B1 to B12)

print(coll.size());

// 3. Reduce the image collection by computing pixel-wise mean
var collMean = coll.reduce(ee.Reducer.mean());
print(collMean);

// 4. Visualize RGB mean composite
var rgbVis = {
  min: 0,
  max: 3000,
  bands: ["B4_mean", "B3_mean", "B2_mean"]
};
Map.addLayer(collMean.clip(roi), rgbVis, "Sentinel Image Mean");

// 5. Compute mean reflectance for B4, B3, B2 over the ROI
var stats = collMean.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: roi,
  scale: 100
});

print("Mean value in B4:", stats.get("B4_mean"));
print("Mean value in B3:", stats.get("B3_mean"));
print("Mean value in B2:", stats.get("B2_mean"));
