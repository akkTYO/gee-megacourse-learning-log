// Random Forest Supervised Classification with Landsat 9

// Step 1: Load and preprocess Landsat imagery
var dataset = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
  .filterDate("2022-01-01", "2022-05-30")
  .filterBounds(roi)
  .filterMetadata("CLOUD_COVER", "LESS_THAN", 10);

// Apply scale factors to SR and thermal bands
function applyScaleFactors(image){
  var opticalBands = image.select("SR_B.").multiply(2.75e-05).add(-0.2);
  var thermalBands = image.select("ST_B.*").multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
var rescale = dataset.map(applyScaleFactors);
var image = rescale.median();

// Display RGB composite
Map.addLayer(image.clip(roi), {
  bands: ["SR_B4", "SR_B3", "SR_B2"],
  min: 0.0,
  max: 0.3
}, "Landsat 9 RGB");
Map.centerObject(roi, 10);

// Step 2: Prepare labeled training data
var water  = water.map(function(f) { return f.set('Class', 0); });
var urban  = urban.map(function(f) { return f.set('Class', 1); });
var forest = forest.map(function(f) { return f.set('Class', 2); });
var crop   = crop.map(function(f) { return f.set('Class', 3); });
var barren = barren.map(function(f) { return f.set('Class', 4); });

var training = barren.merge(forest).merge(water).merge(urban).merge(crop);

// Step 3: Train Random Forest classifier
var label = "Class";
var bands = ["SR_B1", "SR_B2", "SR_B3", "SR_B4", "SR_B5", "SR_B7"];
var input = image.select(bands);

var trainImage = input.sampleRegions({
  collection: training,
  properties: [label],
  scale: 30
});
var trainingData = trainImage.randomColumn();
var trainSet = trainingData.filter(ee.Filter.lessThan("random", 0.8));
var testSet = trainingData.filter(ee.Filter.greaterThanOrEquals("random", 0.8));

var classifier = ee.Classifier.smileRandomForest(10).train({
  features: trainSet,
  classProperty: label,
  inputProperties: bands
});

var classified = input.classify(classifier);

// Display classified map
Map.addLayer(classified.clip(roi), {
  palette: ["#0944ff", "#ff2b2b", "#0a9919", "#c2b32c", "#a1a1a0"],
  min: 0,
  max: 4
}, "classification");

// Step 4: Accuracy Assessment
var confusionMatrix = ee.ConfusionMatrix(testSet.classify(classifier)
  .errorMatrix({actual: "Class", predicted: "classification"}));

print("Confusion matrix;", confusionMatrix);
print("Overall Accuracy;", confusionMatrix.accuracy());
print("Producers Accuracy;", confusionMatrix.producersAccuracy());
print("Consumers Accuracy;", confusionMatrix.consumersAccuracy());

// Step 5: Export
Export.image.toDrive({
  image: classified,
  description: "Landsat_Classified_RF",
  scale: 30,
  region: roi,
  maxPixels: 1e13
});
