// script.js — GEE Random Sampling within FeatureCollection
// Based on Mega Course Section 5 - Lecture 13 (Random Sampling)

// 1. Load FeatureCollection (country borders)
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');

// 2. Filter the country of interest (Zambia)
var roi = countries.filter(ee.Filter.eq("country_na", "Zambia"));
print(roi);

// 3. Generate 500 random sample points within the ROI
var randomPoints = ee.FeatureCollection.randomPoints(roi, 500);
print(randomPoints);


// 4. Set visualization parameters for the points (red color)
var vizParams = { color: "red" };

// 5. Display the ROI and points on the map
Map.addLayer(roi, {}, "ROI");
Map.addLayer(randomPoints, vizParams, "Random Points");
Map.centerObject(roi, 7);
