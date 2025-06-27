// Basic JavaScript Data Types

//Strings
//Use singe or double quotes to make a string.

var myString = "How are you?";
print(myString);

//Numbers
//Store a number in a variable.

var number = 94;
print("The answer is:", number);

//Lists
//Use square brackets [] to make a list.
//Lists can also store strings or other oblects.

var listofNumbers = [1, 3, 5, 7, 9];
print("List of numbers:", listofNumbers);

//Make a list of strings.
var listofStrings = ["San francisco", "New York", "Paris", "London"];
print("List of cities:", listofStrings);

//Objects
//Objects in Javascript are dictionaries of key: value pairs.
//Make an object (or dictionary) using curly brackets{}.

var myObject = {
  Country: "Ethiopia",
  Continent: "Africa",
  Cities: ["Addis Ababa", "Dire Vawa", "Adama", "Bahir Dar"]
};

print("Dictionary;",myObject);

//Access dictionary item using square buckets.

print("Print Country:", myObject["Country"]);

//Access dictionary items using dot notation.

print("Print cities", myObject.Cities);

//Funtions

var firstFunction = function(parameter1, parameter2, parameter3){
  statements;
  statements;
  statements;
  return statement;
}

//The reflect function takes a single parameter: element.

var reflect = function(element){
  return element;
};

print("How is your day?", reflect("Great, how about you?"));
