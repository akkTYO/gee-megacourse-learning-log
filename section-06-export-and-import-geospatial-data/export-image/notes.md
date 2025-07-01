# Export　Images - GEE Learning Log

This note summarizes the learning from Section 5 - Lecture 15: Exporting Image to Google Drive of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677826#overview).

---

## What This Script Does

- Loads Sentinel-2 SR (Harmonized) imagery
- Filters by:
  - Region of interest (ROI)
  - Cloud coverage less than 20%
  - Date range: January to June 2022
- Selects visible bands (B4, B3, B2)
- Creates a median composite to reduce cloud impact
- Scales values from DN to reflectance using `.divide(10000)`
- Clips the image to the ROI boundary
- Displays both full and clipped images on the map
- **Exports the clipped image** (RGB composite) to Google Drive using `.visualize()` and `Export.image.toDrive()`

---

## Key GEE Concepts Used

| Concept                   | Purpose                                                      |
|---------------------------|--------------------------------------------------------------|
| `.filterBounds()`         | Select images overlapping the ROI                            |
| `.filterMetadata()`       | Filter by cloud cover from metadata                          |
| `.filterDate()`           | Filter by date range                                         |
| `.select()`               | Choose specific bands for visualization                      |
| `.median()`               | Combine multiple images into a median composite              |
| `.divide(10000)`          | Convert integer DN values to real reflectance               |
| `.clip()`                 | Crop image to ROI                                            |
| `.visualize()`            | Convert image into RGB displayable format                    |
| `Export.image.toDrive()`  | Export image to Google Drive as file                         |
| `scale`                   | Set pixel resolution (in meters per pixel) for export        |

---

## Output

This script produces:

- A cloud-reduced true-color composite clipped to the ROI
- An exported RGB image saved to Google Drive

![Clipped Sentinel Export](map_s2_b432_median_clip_export_2022_roi.png)

---

## Notes

### What was new?

- Learned to use `.visualize()` to prepare an image for RGB export
- Used `Export.image.toDrive()` to export clipped imagery

### What does `scale: 10` mean?**

→ `scale` sets the resolution of the exported image in meters per pixel.  
In this case, `scale: 10` means the exported image will have a 10-meter spatial resolution,
which matches Sentinel-2's native resolution for visible bands (B2–B4).  
Higher values = coarser output, lower values = larger file size.

---

## 🔗 References
- Udemy Course: [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677826#overview)
- GEE Dataset: [Harmonized Sentinel-2 MSI: MultiSpectral Instrument, Level-2A (SR)](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED?hl=ja)


