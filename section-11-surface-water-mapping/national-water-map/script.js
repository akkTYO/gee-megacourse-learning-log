// National Water Map using GlobalSurfaceWater "max_extent" band

// Load JRC Global Surface Water dataset
var gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");

// Load simplified country boundaries and filter to Brazil
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var roi = countries.filter(ee.Filter.eq("country_na","Brazil"));

// Get geometry from Brazil polygon
var geometry = roi.geometry();
Map.centerObject(geometry, 4);

// Select the max_extent band
// This shows where water was detected at any point (1984–2021)
var water = gsw.select("max_extent");

// Clip the water extent to Brazil
var clipped = water.clip(geometry);

// Visualization parameters (0 = land, 1 = water)
var visParams = { 
  min: 0,
  max: 1,
  palette:["white", "blue"]
};

// Use .selfMask() to hide land pixels (0), show only water (1)
Map.addLayer(clipped.selfMask(), visParams, "surface water");
