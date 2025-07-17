# Air Pollution Monitoring (Methane) – GEE Learning Log

This note summarizes the learning from Section 13 of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/43212640).

## What This Script Does

- Loads **Sentinel-5P TROPOMI** air quality data for **CH4 (Methane)** concentration
- Filters for **January 2024**
- Computes the **monthly mean CH4 density** using `.mean()`
- Visualizes results using a color-coded palette over a global basemap

## Key Concepts

| Concept | Description |
|---------|-------------|
| `COPERNICUS/S5P/OFFL/L3_CH4` | Sentinel-5P offline methane Level-3 data |
| `CH4_column_volume_mixing_ratio_dry_air` | Column-averaged dry air mixing ratio of methane in parts per billion (ppb) |
| `.mean()` | Aggregates an image collection to a single image representing the mean of all images in the range |
| `palette` | Used to visualize high vs low CH4 concentrations |

## Output

### Output Samples
![global_map_of_methane](map_s5p_ch4_mean_2024-01_global.png)

**Global Map of Methane (CH4)**
- Monthly mean from January 2024
- Red/yellow areas indicate high CH4 concentration
- Black/blue indicate low CH4 levels

## Notes

### Why visualize CH4?

- **CH4** is the second most important greenhouse gas after CO2, contributing significantly to climate change.
- Helps understand emission sources from agriculture, fossil fuel industry, waste management, and natural sources.
- Essential for **climate policy**, **emission reduction strategies**, and **environmental monitoring**.
- Supports **leak detection** in oil and gas operations and **compliance monitoring**.

### What is Sentinel-5P TROPOMI?

- A European satellite mission for monitoring atmospheric trace gases.
- **COPERNICUS/S5P/OFFL/L3_CH4** provides offline Level-3 data for methane (CH4).
- **Resolution**: ~1113.2 meters (approximately 1.1 km) pixel size.
- **Update Frequency**: 2-day revisit interval, providing near-daily global coverage.
- **Provider**: European Union/ESA/Copernicus program.
- **Data Availability**: February 2019 to present.

### What does `.mean()` do?

- It takes all images in the specified date range (January 2024) and computes the **pixel-wise average**.
- Useful for smoothing daily fluctuations and creating a **monthly composite**.
- Reduces noise and provides a more stable representation of methane concentrations over time.

### Use Cases for Methane Monitoring

- **Climate Change Mitigation**: Tracking global methane emissions to support climate targets
- **Industrial Monitoring**: Detecting leaks in oil and gas infrastructure
- **Agricultural Assessment**: Monitoring emissions from livestock and rice cultivation
- **Waste Management**: Tracking emissions from landfills and waste treatment facilities
- **Policy Support**: Providing data for emission inventories and regulatory compliance
- **Research**: Understanding methane sources and atmospheric chemistry

## Reference

1. Learning materials: [GEE Mega Course – Section 13: Air Pollution Monitoring](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/43212640)
2. Methane Dataset: [COPERNICUS/S5P/OFFL/L3_CH4](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_CH4)
3. Sentinel-5P Mission: [ESA Sentinel-5P](https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-5p)
4. TROPOMI Instrument: [TROPOMI Official Website](https://www.tropomi.eu/)

