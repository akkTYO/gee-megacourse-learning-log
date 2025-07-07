// Unsupervised Classification (Clustering) with Sentinel-2

// 1. Define region of interest (a rectangular farm area in South Africa)
var roi = ee.Geometry.Rectangle(31.56, -26.24, 31.78, -26.09);
Map.addLayer(roi, {}, "Region");
Map.centerObject(roi, 12);

// 2. Load Sentinel-2 imagery, filter by cloud cover, date, and bands
var image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
  .filterBounds(roi)
  .filterMetadata("CLOUD_COVERAGE_ASSESSMENT", "LESS_THAN", 20)
  .filterDate("2022-01-01", "2022-06-01")
  .select(["B4", "B3", "B2"]) // red, green, blue
  .median(); // create median composite image

// 3. Rescale reflectance from DN to 0–1 range
var rescale = image.divide(10000);

// 4. Clip to the region of interest
var clipImage = rescale.clip(roi);

// 5. Display true color image
var visParam = {bands:["B4", "B3", "B2"], min: 0, max: 0.4};
Map.addLayer(clipImage, visParam, "Sentinel Image");

// 6. Sample 5,000 random pixels from the image within the ROI
var training = image.sample({
  region: roi,
  scale: 30,
  numPixels: 5000
});

// 7. Train k-means clustering model (15 classes)
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);

// 8. Apply trained model to classify all pixels in the image
var result = image.cluster(clusterer);

// 9. Visualize clustered map with random colors
Map.addLayer(result.clip(roi).randomVisualizer(), {}, "Unsupervised Classification");
print("result", result.getInfo());
