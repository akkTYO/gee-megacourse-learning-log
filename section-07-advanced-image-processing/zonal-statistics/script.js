// script.js — CHIRPS Annual Rainfall by Country in Africa

// 1. Load African country boundaries
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("wld_rgn", "Africa"));
Map.addLayer(roi, {}, "Countries");
Map.centerObject(roi, 4);

// 2. Load CHIRPS Daily Precipitation Data (2023)
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
  .select("precipitation")
  .filterDate("2023-01-01", "2024-01-01");

// 3. Reduce daily images to annual total precipitation
var annualChirps = chirps.reduce(ee.Reducer.sum());
Map.addLayer(annualChirps.clip(roi), {
  min: 0,
  max: 3500,
  palette: [
    "000096", "0064ff", "00b4ff", "33db80", "9beb4a",
    "ffeb00", "ffb300", "ff6400", "eb1e00", "af0000"
  ]
}, "Annual Rainfall (mm)");

// 4. Compute average rainfall per country (zonal statistics)
var zonalCountry = annualChirps.reduceRegions({
  collection: roi,
  reducer: ee.Reducer.mean(),
  scale: 5000
});

// 5. Export result to CSV on Google Drive
Export.table.toDrive({
  collection: zonalCountry,
  description: "CHIRPS_Annual_Rainfall_By_Country",
  folder: "ee_data",
  fileFormat: "CSV",
  selectors: ["country_na", "mean"]
});
