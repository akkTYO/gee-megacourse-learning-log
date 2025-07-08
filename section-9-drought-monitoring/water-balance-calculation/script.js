// Water Balance Monitoring in Rwanda using CHIRPS and MODIS ET Data

// Load boundary of Rwanda
var roi = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
  .filter(ee.Filter.eq("country_na", "Rwanda"));
Map.centerObject(roi, 8);
Map.addLayer(roi, {}, "ROI");

// Set analysis period
var startYear = 2015;
var endYear = 2022;
var startDate = ee.Date.fromYMD(startYear, 1, 1);
var endDate = ee.Date.fromYMD(endYear + 1, 1, 1);

// Generate year and month lists
var years = ee.List.sequence(startYear, endYear);
var months = ee.List.sequence(1, 12);

// Load datasets
var CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD")
  .select("precipitation")
  .filterDate(startDate, endDate);

var mod16 = ee.ImageCollection("MODIS/006/MOD16A2")
  .select("ET")
  .filterDate(startDate, endDate);

// Compute monthly water balance = Precipitation - Evapotranspiration
var waterBalance = ee.ImageCollection.fromImages(
  years.map(function(y){
    return months.map(function(m){
      var P = CHIRPS.filter(ee.Filter.calendarRange(y, y, "year"))
        .filter(ee.Filter.calendarRange(m, m, "month"))
        .sum();
      
      var ET = mod16.filter(ee.Filter.calendarRange(y, y, "year"))
        .filter(ee.Filter.calendarRange(m, m, "month"))
        .sum()
        .multiply(0.1); // MODIS ET scale factor
      
      var wb = P.subtract(ET).rename("waterbalance");
      
      return wb.set("year", y)
               .set("month", m)
               .set("system:time_start", ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);

// Visualize mean monthly water balance
var balanceVis = {
  min: 0,
  max: 100,
  palette: "red, orange, yellow, blue"
};
Map.addLayer(waterBalance.mean().clip(roi), balanceVis, "Mean monthly water balance");

// Create time-series chart
var chartMonthly = ui.Chart.image.seriesByRegion({
  imageCollection: waterBalance,
  regions: roi.geometry(),
  reducer: ee.Reducer.mean(),
  band: "waterbalance",
  scale: 500,
  xProperty: "system:time_start"
}).setSeriesNames(["WaterBalance"])
.setOptions({
  title: "Water Balance (Monthly)",
  hAxis: { title: "Month" },
  vAxis: { title: "Rainfall - ET (mm)" },
  colors: ["blue"]
});

print(chartMonthly);
