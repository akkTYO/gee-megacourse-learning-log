//Annual Water Mapping with JRC Yearly History

// 1. Load dataset and print metadata
var gswYearly = ee.ImageCollection("JRC/GSW1_4/YearlyHistory");
print(gswYearly); // Verify available years

// 2. Filter for 2019 data
var filterd = gswYearly.filter(ee.Filter.eq("year", 2019));
var gsw2019 = ee.Image(filterd.first());

// 3. Classify water pixels (values 2 & 3)
var water2019 = gsw2019.eq(2)  // Seasonal water
               .or(gsw2019.eq(3)); // Permanent water

// 4. Apply mask
var water2019 = water2019.selfMask();

// 5. Visualize
var visParams ={
  min: 0,
  max: 1,
  palette: ["white", "blue"]
};
  
Map.addLayer(water2019, visParams, "2019 Water Map");
