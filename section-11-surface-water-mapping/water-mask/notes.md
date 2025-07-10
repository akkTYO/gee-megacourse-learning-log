# Global Surface Water Mask (max_extent) – GEE Learning Log

This note summarizes Section 11: "Water Mask" from the [GEE Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677814#overview).

---

## What This Script Does

- Loads the `max_extent` band from the JRC Global Surface Water dataset
- Creates a binary mask for areas that were ever detected as water (1984–2021)
- Uses two methods (`updateMask()` and `selfMask()`) to display only water areas
- Visualizes global surface water extent in blue

---

## Key Concepts

| Concept                     | Description |
|-----------------------------|-------------|
| `JRC/GSW1_4/GlobalSurfaceWater` | Global surface water data (v1.4) from Landsat |
| `max_extent`               | Binary band (1 = water was ever observed, 0 = never water) |
| `.updateMask(image)`       | Masks out zero values by applying a mask |
| `.selfMask()`              | Shortcut for masking all zero pixels |
| `Map.addLayer()`           | Visualizes the resulting water mask on the map |

---

## Output

The map shows **all pixels that were ever classified as surface water** from 1984–2021.  
Only areas with value `1` are displayed in blue.

### Output Sample
![](map_gsw_watermask_maxextent_global.png)
![](map_gsw_watermask_maxextent_lakevictoria.png)

---

## Notes

### What is the JRC Global Surface Water dataset?

The JRC GSW dataset uses Landsat imagery from 1984–2021 to map surface water dynamics globally.  
It includes multiple bands, such as:

- `occurrence`: % of time water was detected
- `seasonality`: how often water recurs
- `change`: water gains/losses
- `max_extent`: **binary map** showing where water has ever been detected

[More about GSW v1.4](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater)

---

### What is a water mask?

A water mask is a binary layer used to distinguish **water vs. non-water** areas.  
In this case, `max_extent` is used to create a mask of locations that have **ever been classified as water** over the satellite record.

---

### What does `updateMask(water)` do?

`updateMask()` sets the image mask using another image.  
Here, only pixels where `water == 1` are kept.  
Pixels with `0` (non-water) are masked out and not displayed.

---

### What does `selfMask()` do?

`.selfMask()` is a **shortcut** to mask out all zero-valued pixels in an image.  
It keeps only pixels with non-zero values (e.g., value = 1 in `max_extent`).

Equivalent to:
```javascript
image.updateMask(image)
```

## Reference
**Udemy:**
- [GEE Mega Course – Section 11: Surface Water Mapping -Water Mask](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677814#overview)

**Dataset:**
- Surface Water Layer
  - Collection ID: JRC/GSW1_4/GlobalSurfaceWater
  - Source: Earth Egine Data Catalog | [JRC GSW v1.4 – Global Surface Water](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater#bands)
