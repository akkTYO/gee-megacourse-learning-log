// WorldPop Population Visualization over Horn of Africa

// 1. Define countries of interest (Horn of Africa)
var country_names = ["Ethiopia", "Sudan", "South Sudan", "Kenya", "Somalia", "Djibouti", "Uganda"];
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.inList("country_na", country_names));

// 2. Set visualization parameters for population density
var viz = {
  min: 0.0,
  max: 60,
  palette: "999999, abdda4, ffffbf, fdae61, d7191c"
};

// 3. Load WorldPop image collection (default unadjusted population)
var worldpop = ee.ImageCollection("WorldPop/POP");

// 4. Compute pixel-wise mean population across all available years
var meanPopulation = worldpop.reduce(ee.Reducer.mean());
print(meanPopulation);

// 5. Display result
Map.addLayer(meanPopulation.clip(roi), viz, "WorldPop Mean");
Map.centerObject(roi, 5);
