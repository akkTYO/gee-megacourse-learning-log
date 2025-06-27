// script.js - GEE Earth Engine Object examples
// Section 4 - Earth Engine Mega Course

// --- Strings ---
// Convert a normal JavaScript string to an Earth Engine ee.String
var testString = "My first strings example.";
var eeString = ee.String(testString);
print("This:", eeString);

// Define a string directly as an Earth Engine object
var myString = ee.String("This is on the Earth Engine server.");
print("String on the server:", myString);


// --- Lists ---
// Create an Earth Engine list from a JavaScript array
var eeList = ee.List([1, 2, 3, 4, 5]);
print("eeList:", eeList);

// Use sequence(start, end) to generate a list from 1 to 5
var sequence = ee.List.sequence(1, 5);
print("sequence:", sequence);

// Access a value in the list with .get(index)
var value = sequence.get(3); // Index starts from 0
print("value at index 3:", value);


// --- Dates ---
// Create a date from string
var date = ee.Date("2015-12-31");
print("Date from string:", date);

// Create a date from year, month, day
var aDate = ee.Date.fromYMD(2017, 1, 13);
print("Date from YMD:", aDate);

// Create a date using an object
var testDate = ee.Date.fromYMD({
  day: 23,
  month: 4,
  year: 2023
});
print("Date from object:", testDate);

// Advance a date (e.g., by 1 year)
var date = ee.Date("2019-01-01");
var futureDate = date.advance(1, "year");
print("One year later:", futureDate);


// --- Dictionary ---
// Convert a JavaScript object to an Earth Engine dictionary
var data = {
  city: "Addis Ababa",
  population: 9000000,
  elevation: 2500
};
var eeData = ee.Dictionary(data);

// Use .get(key) to access values (dot notation doesn't work)
print("City from dictionary:", eeData.get("city"));
