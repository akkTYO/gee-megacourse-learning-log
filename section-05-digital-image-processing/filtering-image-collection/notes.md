
# Image Collection Filtering – GEE Learning Log

This note summarizes the learning from **Section 5 - Lecture 12: Filtering Image Collection** of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42661228).

---

## What This Script Does

- Defines a region of interest (ROI) using latitude/longitude point
- Loads the Landsat 9 Level-2 Surface Reflectance collection
- Applies scale and offset factors to convert DN to reflectance and temperature
- Filters the collection:
  - By **cloud cover**: less than 10%
  - By **date**: between January and March 2022
  - By **spatial bounds**: must intersect the ROI
- Displays the size (number of images) before and after filtering

---

## Key GEE Concepts Used

| Concept                    | Purpose                                                                 |
|----------------------------|-------------------------------------------------------------------------|
| `ee.Geometry.Point()`      | Defines a region of interest (ROI) as a geographic point                |
| `ee.ImageCollection()`     | Loads a satellite image collection (Landsat 9 SR)                       |
| `.map()`                   | Applies a custom function to each image in the collection               |
| `applyscaleFactors()`      | Converts raw DN values to physical reflectance and temperature          |
| `.filterMetadata()`        | Filters by cloud cover from metadata (`CLOUD_COVER`)                    |
| `.filter(Filter.date())`   | Filters by date range                                                   |
| `.filter(Filter.bounds())` | Filters to images overlapping with the ROI                              |
| `.addBands(null, true)`    | Overwrites existing bands with scaled versions (explained below)        |

---

## Output

This process results in a filtered Landsat 9 image collection that:
- Has **cloud coverage < 10%**
- Covers a specific **region in East Africa**
- Falls within a defined **date range (Q1 2022)**

### Scaled True Color Composite (True Colour)
![](.map_l9_b432_filtered_cloud10_2022_eastafrica.png)

---

## Notes

### What are opticalBands and thermalBands?

- `opticalBands`: Visible and near-infrared bands used for RGB/NIR analysis (e.g. SR_B2–SR_B7)
- `thermalBands`: Bands for surface temperature, such as `ST_B10`.  

---

### Why are these bands merged with `addBands()`?

After manually applying scale and offset, the processed reflectance and thermal bands need to be added back to the original image.

Using:

```javascript
image.addBands(newBands, null, true)
```

- `null`:  Keeps the original band names
- `true`:  Replaces existing bands with the new (scaled) versions

---

### What does applyscaleFactors() do?

It converts raw Digital Numbers (DNs) into meaningful physical values:

- Reflectance for optical bands (range 0.0–1.0)
- Temperature in Kelvin for thermal bands

This is an essential preprocessing step before using the imagery for visualization or analysis.

---

### Filtering by CLOUD_COVER < 10

```javascript
.filterMetadata("CLOUD_COVER", "less_than", 10)
```
This line ensures only images with less than 10% cloud coverage are used.
This helps produce cleaner satellite composites and improves accuracy for analysis.

## 🔗 References
- Udemy Course: [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42661228#overview)
- GEE Dataset: [LANDSAT/LC09/C02/T1_L2](https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC09_C02_T1_L2)
