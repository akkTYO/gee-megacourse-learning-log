// Annual Water Map using JRC Global Surface Water YearlyHistory (v1.4)

// 1. Load the yearly water history dataset (1984–2021)
var gwsYearly = ee.ImageCollection("JRC/GSW1_4/YearlyHistory");
print(gwsYearly);

// 2. Filter the collection for a specific year (e.g., 2019)
var filtered = gwsYearly.filter(ee.Filter.eq("year", 2019));
var gsw2019 = ee.Image(filtered.first());

// 3. Identify water pixels
// Class values:
// 0 = No data, 1 = Not water, 2 = Seasonal water, 3 = Permanent water
var water2019 = gsw2019.eq(2).or(gsw2019.eq(3));  // seasonal OR permanent

// 4. Mask out non-water pixels (set them to null)
var water2019 = water2019.selfMask();  // keep only pixels with value 1

// 5. Set visualization parameters
var visParams = {
  min: 0,
  max: 1,
  palette: ["white", "blue"]
};

// 6. Display water mask on the map
Map.addLayer(water2019, visParams, "2019 Water Map");
