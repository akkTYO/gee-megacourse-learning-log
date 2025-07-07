// ET Timeseries Plot using MODIS MOD16A2 (Evapotranspiration)

// Load simplified country boundary dataset
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var Ethiopia = countries.filter(ee.Filter.eq("country_na", "Ethiopia"));

// Load MODIS ET data (MOD16A2: 8-day 500m ET product)
var ET = ee.ImageCollection("MODIS/006/MOD16A2")
  .filter(ee.Filter.date("2015-01-01", "2019-12-31"))
  .select("ET");  // Select evapotranspiration band

// Create DOY time series plot of mean ET per year over Ethiopia
var chart = ui.Chart.image.doySeriesByYear(
  ET,                // Image collection
  "ET",              // Band name
  Ethiopia,          // Region
  ee.Reducer.mean(), // Reducer function (mean)
  500                // Spatial resolution in meters
);

print(chart);
