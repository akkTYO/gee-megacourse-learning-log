// script.js — Import and Visualize World Bank Shapefile in GEE
// Based on Mega Course Section 6 - Importing Vector Data

// 1. Load the uploaded shapefile as a FeatureCollection
var roi = ee.FeatureCollection('YOUR_ASSET_PATH_HERE');

// 2. Preview the first 10 features to examine attribute fields
print(roi.limit(10));

// 3. Display all countries on the map
Map.addLayer(roi, {}, 'World Countries');

// 4. Filter one country (e.g. Sudan) by attribute field
// Note: The field name is "NAM_0", not "NAME_EN" (depends on the shapefile)
var Egypt = roi.filter(ee.Filter.eq('NAM_0', 'Sudan'));

// 5. Display the selected country in red
Map.addLayer(Egypt.style({
  color: 'red',
  fillColor: '#FF000080',
  width: 1
}), {}, 'Sudan');

// 6. Center the map to the selected country
Map.centerObject(Egypt, 5);
