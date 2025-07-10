// Water Mask using GSW (Global Surface Water) max_extent

// 1. Load Global Surface Water image
var gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");

// 2. Select the "max_extent" band (area that was ever classified as water)
var water = gsw.select("max_extent");

// 3. Apply masking to remove zero-value (non-water) pixels
// Option 1: using updateMask()
var masked = water.updateMask(water);

// Option 2: shorter syntax using selfMask()
var masked = water.selfMask();

// 4. Display the water mask
Map.addLayer(masked, {palette: "blue"}, "water");
