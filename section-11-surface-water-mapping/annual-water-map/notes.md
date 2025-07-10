# Annual Water Mask (Yearly History) - GEE Learning Log

## Overview
This log documents annual water mapping using the JRC GSW Yearly History dataset.

## Key Concepts

### JRC GSW Yearly History vs. Global Surface Water
| Feature | Yearly History | Global Surface Water |
|---------|----------------|----------------------|
| Temporal Resolution | Annual (1984-2021) | Composite (all years) |
| Water Classes | 4 categories | Binary (max extent) |
| Best For | Yearly changes | Permanent water bodies |
| Values | 1:not water, 2:seasonal, 3:permanent | 0:never water, 1:ever water |

### Water Classification
- **1**: Not water
- **2**: Seasonal water
- **3**: Permanent water
- **4**: No data

### selfMask() Method
- Automatically masks all zero values
- Preserves only non-zero (water) pixels
- More efficient than updateMask() for binary results

## Output
Visualizes 2019 water bodies:
- Seasonal (2) and permanent (3) water combined
- Blue=water, White=non-water

## References
1. [GEE Mega Course - Section 12](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42953794)
2. [JRC GSW Yearly History](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_YearlyHistory)
