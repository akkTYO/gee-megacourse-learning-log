# Image Scaling with Landsat 9 – GEE Learning Log

This note summarizes what was learned in **Section 5 - Lecture 11: Image Scaling** of the [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42661214).

---

## What This Script Does

- Loads Landsat 9 SR imagery from the year 2022
- Applies scale and offset factors to convert raw DN values into reflectance and temperature
- Displays the image using a **True Color (432)** composite with physically meaningful pixel values

---

## Key GEE Concepts Used

| Concept                | Purpose                                                      |
|------------------------|--------------------------------------------------------------|
| `ee.ImageCollection`   | Load a collection of Landsat 9 images                        |
| `.filterDate()`        | Filter images to a specific date range (2022)               |
| `.map()`               | Apply a function to all images in the collection            |
| `applyScaleFactors()`  | Custom function to convert DN to reflectance and temperature |
| `.select()`            | Choose specific bands to scale                               |
| `.multiply().add()`    | Apply scale and offset operations to bands                   |
| `Map.addLayer()`       | Display the processed image on the map                       |

---

## Output Sample

### Scaled True Color Composite (True Colour)
![](./map_l9_b432_scaled_rgb_2022.png)

---

## Notes

### What are `scale` and `offset`?

Landsat imagery stores pixel data as integers (DN = Digital Numbers).  
To convert these into meaningful physical values, GEE applies:

real_value = DN * scale + offset


- Optical Bands (e.g., SR_B4):  
  `scale = 0.0000275`, `offset = -0.2`
- Thermal Bands (e.g., ST_B10):  
  `scale = 0.00341802`, `offset = +149.0`

This makes the data interpretable as surface reflectance (0.0–1.0) and temperature in Kelvin.

---

### Why use `min: 0.0, max: 0.3` in visualization?

These values define the brightness range for display on the map:

- `min`: values ≤ 0.0 are shown as black
- `max`: values ≥ 0.3 are shown as white
- Values in between are proportionally color-scaled

Typical surface reflectance values fall between **0.0 and 0.3**, so this setting ensures natural-looking images.

## 🔗 References
- Udemy Course: [Google Earth Engine Mega Course](https://www.udemy.com/course/google-earth-engine-gis-remote-sensing/learn/lecture/42661214)
- GEE Dataset: [LANDSAT/LC09/C02/T1_L2](https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC09_C02_T1_L2)
