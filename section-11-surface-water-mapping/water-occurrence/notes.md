# Global Surface Water Occurrence – GEE Learning Log

This note summarizes Section 11: Suraface Water Mapping -Water Occurrence from the [GEE Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677810#overview).

---

## What This Script Does

- Loads the JRC Global Surface Water dataset (GSW v1.4)
- Extracts the `occurrence` band, which indicates how often water was detected over time (0–100%)
- Visualizes global surface water persistence using a red→blue gradient

---

## Key Concepts

| Concept                         | Description |
|----------------------------------|-------------|
| `JRC/GSW1_4/GlobalSurfaceWater`  | Global surface water dataset from 1984 to 2021 |
| `"occurrence"` band              | % of time water was present at each pixel |
| `Map.addLayer()`                 | Visualizes water frequency on the map |

---

## Output

The map shows **where water has occurred globally** between 1984–2021.  
- Blue = Water observed frequently  
- Red = Water observed rarely  

### Output Sample
![](map_gsw_occurrence_global.png)

---

## Notes

### What is the JRC Global Surface Water Dataset?

This dataset is developed by the Joint Research Centre (JRC) of the European Commission.  
It uses **Landsat imagery from 1984–2021** to monitor changes in surface water bodies.

- Dataset ID: `JRC/GSW1_4/GlobalSurfaceWater`
- Band used: `occurrence`
- Value: 0–100 (% of time water was observed)
- Spatial resolution: 30m
- Temporal span: 1984–2021 (updated annually)
- Applications: hydrology, flood mapping, climate studies, water resource monitoring

More info:  
[Dataset Catalog](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater?hl=en)

---

## Reference
**Udemy:**
- [GEE Mega Course – Section 11: Surface Water Mapping -Water Occurence](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42677810#overview)

**Dataset:**
- Surface Water Layer
  - Collection ID: JRC/GSW1_4/GlobalSurfaceWater
  - Source: Earth Egine Data Catalog | [JRC GSW v1.4 – Global Surface Water](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater)
