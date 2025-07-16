# Forest Gain and Loss Area Statistics – GEE Learning Log

This note summarizes the learning from Section 12 of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/43096418).

---

## What This Script Does

- Uses the **Hansen Global Forest Change v1.12** dataset (2000–2024)
- Focuses on **Gabon**
- Calculates total area (in m² and km²) of:
  - **Forest Loss** (2001–2024)
  - **Forest Gain** (2000–2012)
- Uses pixel-wise area computation and summarization
- Displays map layers for forest gain/loss with ROI overlay

---

## Key Concepts

| Concept | Description |
|--------|-------------|
| `pixelArea()` | Converts each pixel into an image of its physical area in square meters |
| `multiply()` | Applies pixel-wise multiplication to compute per-pixel area |
| `reduceRegion()` | Aggregates pixel data within a specified geometry (e.g. total sum) |
| `ee.Reducer.sum()` | Calculates the total sum of pixel values in a region |
| `scale` | Pixel resolution used for reduction, here 30m |
| `updateMask()` | Shows only pixels with value = 1, hiding background |

---

## Output

### Calculated Forest Statistics (Gabon, 2000–2024)

- **Total Forest Loss Area**: `5604.04 km²`
- **Total Forest Gain Area**: `387.39 km²`

- **Bar Chart: Gain vs Loss in Gabon (2000–2024)**  
  Visual summary of total gain and loss area (unit: km²)  
  ![](calc_hansen_forestgainloss_2000-2024_gabon.png)

---

## Output Samples

- **Forest Loss Map (2001–2024)**  
  Pixels in red represent tree cover loss during the period  
  ![](map_hansen_forestloss_area_2001-2024_gabon.png)

- **Forest Gain Map (2000–2012)**  
  Pixels in blue represent areas where tree cover increased  
  ![](map_hansen_forestgain_area_2000-2012_gabon.png)

- **Combined Gain & Loss Map**  
  Shows both gain (blue) and loss (red) areas across Gabon  
  ![](map_hansen_forestgainloss_area_2000-2024_gabon.png)

---

## Notes

### What does `.pixelArea()` do?
Returns an image where each pixel value is the area in square meters. Useful for calculating the area of features like forest loss or gain.

### Why use `.multiply(pixelArea)`?
This converts a binary mask (e.g. 1 for loss) into an area raster. When summed, it gives the total area affected.

### What does `reduceRegion()` with `ee.Reducer.sum()` do?
This aggregates the pixel-wise area image over the region of interest (`roi`). It outputs the total surface area (in m²) for forest loss or gain.

### What does `.updateMask()` do?
Keeps only the pixels with a value of 1 (loss or gain), and masks out 0s. This improves map readability and accuracy of area computation.

---

## Reference
1. [Google Earth Engine Mega Course – Section 12](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/43096418)
2. [Global Forest Extent：UMD/hansen/global_forest_change_2024_v1_12](https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2024_v1_12)
3. [World administrative boundaries：USDOS/LSIB_SIMPLE/2017](https://developers.google.com/earth-engine/datasets/catalog/USDOS_LSIB_SIMPLE_2017?hl=ja)
