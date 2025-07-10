# Annual Water Map (2019) – GEE Learning Log

This note summarizes Section 11: "Annual Water Map" from the [GEE Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42953798#overview).

---

## What This Script Does

- Loads the JRC Global Surface Water **YearlyHistory** dataset (v1.4)
- Extracts water classification for a specific year (2019)
- Filters to include only seasonal and permanent water pixels
- Masks out non-water pixels using `.selfMask()`
- Displays a binary water mask (blue = water, white = no data)

---

## Key Concepts
| Concept | Description |
|--------|-------------|
| `JRC/GSW1_4/YearlyHistory` | Annual classification of surface water (1984–2021) |
| `.eq(2).or(.eq(3))` | Identifies pixels classified as seasonal or permanent water |
| `.selfMask()` | Masks out pixels with value 0 (i.e., keeps only water = 1) |
| `Map.addLayer()` | Displays the water mask for a specific year |

## Output

The map displays **areas classified as seasonal or permanent water in 2019**.  
This is useful for visualizing changes in water bodies over time.
- Blue=water, White=non-water

![](map_gsw_watermask_2019_global.png)

![](map_gsw_watermask_2019_global.png)

---

## Notes

### What is the JRC YearlyHistory dataset?

- Dataset ID: `JRC/GSW1_4/YearlyHistory`
- Coverage: 1984–2021
- Spatial resolution: 30 meters
- Classification types per year:
  - 0 = No data
  - 1 = Not water
  - 2 = Seasonal water
  - 3 = Permanent water

This dataset enables **year-by-year monitoring of water changes** across the globe.

### Difference from `GSW1_4/GlobalSurfaceWater`?

| Dataset | Description |
|--------|-------------|
| `GlobalSurfaceWater` | Contains occurrence, seasonality, change, max_extent, etc. (summarized over time) |
| `YearlyHistory` | Provides **annual** classification of water status for each pixel |

---

### JRC GSW Yearly History vs. Global Surface Water
| Feature | Yearly History | Global Surface Water |
|---------|----------------|----------------------|
| Temporal Resolution | Annual (1984-2021) | Composite (all years) |
| Water Classes | 4 categories | Binary (max extent) |
| Best For | Yearly changes | Permanent water bodies |
| Values | 1:not water, 2:seasonal, 3:permanent | 0:never water, 1:ever water |

---

### What does `.selfMask()` do?

`.selfMask()` is a **shortcut for masking out zero pixels**.  
It retains only pixels where the value is not 0 (e.g., value = 1 = water).
This is useful for creating binary masks where only relevant pixels (e.g., water) are displayed.
- Automatically masks all zero values
- Preserves only non-zero (water) pixels
- More efficient than updateMask() for binary results

Equivalent to:
```javascript
image.updateMask(image)
```

## References
1. [GEE Mega Course - Section 12](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42953794)
2. [JRC GSW Yearly History](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_YearlyHistory)
