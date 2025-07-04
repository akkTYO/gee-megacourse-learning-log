// Extract Sample Points

// 1. Load Ethiopia country boundary
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("country_na", "Ethiopia"));

Map.addLayer(roi, {}, "ROI");
Map.centerObject(roi, 6);
print(roi);

// 2. Load CHIRPS Pentad (5-day interval) Precipitation Data for 2023
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
  .select("precipitation")
  .filterDate("2023-01-01", "2024-01-01");

// 3. Sum all pentad images to get total annual rainfall
var annualChirps = chirps.reduce(ee.Reducer.sum());
print(annualChirps);

// 4. Visualize the rainfall raster
var viz = {
  min: 0,
  max: 3500,
  palette: ["000096", "0064ff", "00b4ff", "33db80", "9beb4a",
            "ffeb00", "ffb300", "ff6400", "eb1e00", "af0000"]
};
Map.addLayer(annualChirps.clip(roi), viz, "Annual Rainfall");

// 5. Determine projection and scale of the image
var projection = annualChirps.projection();         // e.g., EPSG:4326
var scale = annualChirps.projection().nominalScale();  // e.g., ~5000 m

// 6. Sample raster values as points within ROI
var rainfallSamples = annualChirps.sample({
  region: roi,
  projection: projection,
  scale: scale,
  geometries: true,
});
Map.addLayer(rainfallSamples, {}, "Point Extracted");

// 7. Add Rainfall, Longitude, Latitude to each sampled point
rainfallSamples = rainfallSamples.map(function(feature){
  var geom = feature.geometry().coordinates();
  return ee.Feature(null, {
    "Rainfall": ee.Number(feature.get("precipitation_sum")),
    "Long": ee.Number(geom.get(0)),
    "Lat": ee.Number(geom.get(1))
  });
});

print(rainfallSamples.limit(10));

// 8. Export the sampled points to Google Drive (CSV)
Export.table.toDrive({
  collection: rainfallSamples,
  description: "Sample_Points",
  fileFormat: "CSV",
  selectors: ["Rainfall", "Long", "Lat"]
});
