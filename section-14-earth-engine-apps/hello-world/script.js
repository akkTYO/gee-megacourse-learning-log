/// Make a button widget

// Create a button labeled "Click me!"
var button = ui.Button("Click me!");

// Set a callback function that will run when the button is clicked.
button.onClick(function(){
  print("Hello World"); // This prints a message to the console when clicked
});

// Display the button in the console
print(button);
