// Water Prediction with Sentinel Data

// Load study site
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var roi = countries.filter(ee.Filter.eq('country_na', 'Uganda'));
Map.addLayer(roi, {}, 'Uganda', false);
Map.centerObject(roi, 8);

// Calculate NDVI and add as band
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};

// Load Sentinel-2 imagery and compute median composite
var image = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
  .filterDate('2023-01-01', '2024-01-01')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .filterBounds(roi)
  .map(addNDVI)
  .median()
  .clipToCollection(roi);

// Display RGB image
var visParamsTrue = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
Map.addLayer(image, visParamsTrue, "Sentinel 2023");

// Merge labeled points (water = 1, non-water = 0)
var training = Water.merge(NonWater);
print(training);

// Prepare classifier training inputs
var label = 'Class';
var bands = ['B2', 'B3', 'B4', 'B8', 'NDVI'];
var input = image.select(bands);

// Sample training points from image
var trainImage = input.sampleRegions({
  collection: training,
  properties: [label],
  scale: 10
});
print(trainImage);

// Split training and test sets (80/20)
var trainingData = trainImage.randomColumn();
var trainSet = trainingData.filter(ee.Filter.lessThan('random', 0.8));
var testSet = trainingData.filter(ee.Filter.greaterThanOrEquals('random', 0.8));

// Train Random Forest classifier
var classifier = ee.Classifier.smileRandomForest(10)
  .train({
    features: trainSet,
    classProperty: label,
    inputProperties: bands
  });

// Classify image and visualize
var classified = input.classify(classifier);
print(classified.getInfo());

var water = classified.updateMask(classified);
var visParams = {min:0, max:1, palette: ['white','blue']};
Map.addLayer(water, visParams, 'Water');

// Accuracy assessment
var confusionMatrix = ee.ConfusionMatrix(testSet.classify(classifier)
  .errorMatrix({actual: 'Class', predicted: 'classification'}));

print('Confusion matrix:', confusionMatrix);
print('Overall Accuracy:', confusionMatrix.accuracy());
print('Producers Accuracy:', confusionMatrix.producersAccuracy());
print('Consumers Accuracy:', confusionMatrix.consumersAccuracy());

// Export result to Google Drive
Export.image.toDrive({
  image: water,
  description: 'water_model_map',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
