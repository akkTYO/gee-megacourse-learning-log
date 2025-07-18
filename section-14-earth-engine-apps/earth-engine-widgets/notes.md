# Split Panel Land Cover Comparison – GEE Learning Log

This note summarizes the widget-based map comparison using `ui.SplitPanel` from Section 14 of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42662026).

---

## What This Script Does

- Loads land cover datasets from the USGS NLCD for years **2001** and **2019**
- Displays both land cover maps side-by-side using `ui.SplitPanel`
- Enables interactive visual comparison via draggable wipe transition
- Uses `ui.Map.Linker` to synchronize zoom/pan between maps
- Adds an inset minimap for orientation

---

## Key Concepts

| Concept | Description |
|--------|-------------|
| `ui.SplitPanel` | Widget that displays two `ui.Map` views side-by-side with a slider |
| `ui.Map.Linker` | Syncs pan/zoom actions across multiple map instances |
| `ee.ImageCollection("USGS/NLCD_RELEASES/2019_REL/NLCD")` | National Land Cover Database (NLCD), includes urban, vegetation, forest, water, etc. |
| `.filter(ee.Filter.eq('system:index', 'YEAR'))` | Extracts a single year’s map from the collection |

---

## Output Samples
### Split-panel map of landcover in denver

![NLCD Comparison Denver](map_nlcd_splitpanel_landcover_2001-2019_denver.png)

### Image Description
- **Side-by-side land cover comparison (NLCD 2001 vs 2019)**
- Left: 2001 land cover
- Right: 2019 land cover
- Visualized with red = urban, green = forest, brown = cropland, blue = water
- Area: **Denver, Colorado region**
- Enables visual inspection of urban expansion over 18 years

---

## Notes

### What is `ui.SplitPanel()`?
It creates a horizontal (or vertical) split display where two maps can be compared. A draggable handle allows the user to "wipe" between the two visualizations interactively.

### Why use `ui.Map.Linker()`?
It allows the two maps to stay synchronized (e.g., when zooming or panning) which is important when comparing the same region across time.

### What is the purpose of the inset map?
The inset in the bottom-right acts as a global overview of the selected area and gets updated when the bounds change.

### When is this useful?
Great for change detection or visual comparison between two image layers (e.g. land cover, classification results, raw vs. processed imagery).

---

## Reference

1. [GEE Mega Course – Section 14: SplitPanel UI Comparison](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42662026)
2. [USGS/NLCD_RELEASES/2019_REL/NLCD](https://developers.google.com/earth-engine/datasets/catalog/USGS_NLCD_RELEASES_2019_REL_NLCD)
