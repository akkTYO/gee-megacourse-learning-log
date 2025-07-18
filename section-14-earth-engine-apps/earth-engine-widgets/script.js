//Widgets
//There are a variety of widgets you can use to build your UIs.
//These widgets include buttons, checkboxes, sliders, textboxes and selection menus.
//Widgets can only be printed or added to a panel once.

/**********
 1. Labels
***********/
// Labels are simply areas in which text is displayed. 
// For example, the following code prints a label:
var label = ui.Label('My Earth Engine App');
print(label);

/**********
 2. Button
***********/
// A button is an interactive UI widget that can be clicked.
// You can specify a function to be called (the "callback" function) when a user clicks the button. 
var button = ui.Button({
  label: 'Display My Map',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);

/**********
 3. Checkbox
***********/
// A checkbox is a widget that lets a user check (or uncheck) a box.
// When the checkbox's state changes, callbacks registered to the widget are passed a boolean value
// indicating whether the checkbox is now checked.
var checkbox = ui.Checkbox('Display DEM', true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(ee.Image('CGIAR/SRTM90_V4'));
print(checkbox);

/**********
 4. Textbox
***********/
// A textbox is a place to collect user-entered text.
var textbox = ui.Textbox({
  placeholder: 'Enter text here...',
  onChange: function(text) {
    print('This is my earth engine app' + text + '?');
  }
});
print(textbox);

/**********
 5. Select
***********/
// The select widget represents a drop-down menu of choices from which the user can choose one.
// The following example illustrates a drop-down menu to allow a user to select a location:
var places = {
  SanFrancisco: [-122.4598, 37.7662],
  CapeTown: [18.4521, -33.9285],
  London: [-0.1139, 51.4676]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1]);
  }
});
// Set a placeholder.
select.setPlaceholder('Choose a location...');
print(select);

/**********
 6. SplitPanel
***********/
// A ui.SplitPanel is useful for comparing things side-by-side.
// The advantage of a ui.SplitPanel over two ordinary panels is that a handle 
// can be used to achieve a wipe transition between the panels in a ui.SplitPanel. 

// Import the NLCD collection.
var dataset = ee.ImageCollection('USGS/NLCD_RELEASES/2019_REL/NLCD');
// The collection contains images for multiple years and regions in the USA.
print('Products:', dataset.aggregate_array('system:index'));

// Filter the collection to the 2019 product.
var nlcd2019 = dataset.filter(ee.Filter.eq('system:index', '2019')).first();
var landcover2019 = nlcd2019.select('landcover');

var nlcd2001 = dataset.filter(ee.Filter.eq('system:index', '2001')).first();
var landcover2001 = nlcd2001.select('landcover');

// Display land cover on the map.
Map.addLayer(landcover2001, null, 'Landcover 2001');

// Make another map and add a layer to it.
var linkedMap = ui.Map();
linkedMap.addLayer(landcover2001, null, 'Landcover 2001');
linkedMap.addLayer(landcover2019, null, 'Landcover 2019');

// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

// Make an inset map and add it to the linked map.
var inset = ui.Map();
inset.style().set({position: 'bottom-right', width: '300px', height: '250px'});
inset.setControlVisibility({all: false, mapTypeControl: true});
linkedMap.add(inset);

// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});

// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
