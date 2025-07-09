// Water Occurrence from JRC Global Surface Water Dataset

// 1. Load GSW (Global Surface Water) image
var gsw = ee.Image('JRC/GSW1_4/GlobalSurfaceWater');

// 2. Select the "occurrence" band (0–100: % of time water was present)
var occurrence = gsw.select("occurrence");

// 3. Visualization parameters: red = dry, blue = always water
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: ['red', 'blue']
};

// 4. Add water occurrence to the map
Map.addLayer(occurrence, visParams, 'Water Occurrence');
