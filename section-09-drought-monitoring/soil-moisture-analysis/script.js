// SMAP Soil Moisture Monthly Aggregation & Export (GEE)

// Load country boundaries and filter to Ethiopia
var Countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var roi = Countries.filter(ee.Filter.eq("country_na", "Ethiopia"));

// Define years and months
var years = ee.List.sequence(2016, 2021);
var months = ee.List.sequence(1, 12);

// Load SMAP Soil Moisture dataset (Surface Soil Moisture, 10km)
var coll = ee.ImageCollection("NASA_USDA/HSL/SMAP10KM_soil_moisture")
              .filterDate("2016-01-01", "2021-12-31")
              .select("ssm");

// Visualize average soil moisture
var soilVis = {
  min: 0,
  max: 28,
  palette: ["0300ff", "418504", "efff07", "ff0303"]
};
Map.setCenter(17, 13, 2);
Map.addLayer(coll.mean().clip(roi), soilVis, "Soil Moisture (2016‑2021)");

// Annotate each image with month and year as metadata
var smap = coll.map(function(img){
  var d = ee.Date(ee.Number(img.get("system:time_start")));
  var m = ee.Number(d.get("month"));
  var y = ee.Number(d.get("year"));
  return img.set({"month": m, "year": y});
});

// Create monthly composites by year and month
var byYearMonth = ee.ImageCollection.fromImages(
  years.map(function(y){
    return months.map(function(m){
      return smap
        .filterMetadata("year", "equals", y)
        .filterMetadata("month", "equals", m)
        .select("ssm")
        .mean()
        .set("year", y)
        .set("month", m)
        .set("date", ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);

// Calculate mean soil moisture per polygon region
var smapEthiopia = byYearMonth.map(function(img){
  var features = roi.map(function(f){
    return f.set("date", img.get("date"), "month", img.get("month"), "year", img.get("year"));
  });
  var proj = ee.Image(byYearMonth.first()).projection();
  return img.reduceRegions(features, ee.Reducer.mean(), 1000);
}).flatten();

// Export result as CSV
var selectors = "month, year, country_na, mean";
Export.table.toDrive({
  collection: smapEthiopia,
  description: "SMAP_Timeseries",
  folder: "earth_engine_data",
  fileNamePrefix: "SMAP_Timeseries",
  fileFormat: "CSV",
  selectors: selectors
});
