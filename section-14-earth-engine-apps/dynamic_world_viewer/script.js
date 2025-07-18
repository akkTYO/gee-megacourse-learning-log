// Dynamic World Viewer App

// Extract country boundary
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var roi = countries.filter(ee.Filter.eq('country_na', 'Ethiopia'));
Map.centerObject(roi, 6);

// Filter the Dynamic World NRT collection for the year 2021
var startDate = '2021-01-01';
var endDate = '2021-12-31';

var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.bounds(roi));

// Create a Mode Composite of land cover class labels
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());

var dwVisParams = {
  min: 0,
  max: 8,
  palette: ['#419BDF', '#397D49', '#88B053', '#7A87C6',
            '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1']
};

// Clip the composite and add it to the Map
Map.addLayer(dwComposite.clip(roi), dwVisParams, 'Classified Composite', false);

// --- Create a Top-1 Probability Hillshade Visualization ---

var probabilityBands = [
  'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
  'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
];

// Select probability bands
var probabilityCol = dw.select(probabilityBands);

// Create multi-band image of mean probabilities for each class
var meanProbability = probabilityCol.reduce(ee.Reducer.mean());

// Set projection for hillshade calculation
var projection = ee.Projection('EPSG:3857').atScale(10);
meanProbability = meanProbability.setDefaultProjection(projection);

// Compute confidence image and hillshade
var top1Probability = meanProbability.reduce(ee.Reducer.max());
var top1Confidence = top1Probability.multiply(100).int();
var hillshade = ee.Terrain.hillshade(top1Confidence).divide(255);
var rgbImage = dwComposite.visualize(dwVisParams).divide(255);
var probabilityHillshade = rgbImage.multiply(hillshade);

var hillshadeVisParams = {min: 0, max: 0.8};
Map.addLayer(probabilityHillshade.clip(roi), hillshadeVisParams, 'Probability Hillshade');

// --- UI: Legend ---

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

var legendTitle = ui.Label({
  value: 'LULC Type',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);

// Helper to create color row
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

// Add rows to legend
var palette = ['#419BDF', '#397D49', '#88B053', '#7A87C6',
               '#E49635', '#DFC35A', '#C4281B', '#A59B8F', '#B39FE1'];
var names = ['Water', 'Trees', 'Grass', 'Flooded Vegetation',
             'Crops', 'Shrub and Scrub', 'Built Area', 'Bare Ground', 'Snow & Ice'];

for (var i = 0; i < 9; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
Map.add(legend);

// --- UI: Title ---

var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});

var mapTitle = ui.Label({
  value: 'Dynamic World Land Cover Map 2021',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});

title.add(mapTitle);
Map.add(title);
