var model = {
	locations: ko.observableArray([
		{name: "Piggly Wiggly", address: "", description: "", type: "grocery", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Dollar General", address: "", description: "", type: "store", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Subway", address: "", description: "", type: "restaurant", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Sheila's Pizza", address: "", description: "", type: "restaurant", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Lake Pharmacy", address: "", description: "", type: "store", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "DeVaugn Realty", address: "", description: "", type: "services", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "El Patron", address: "", description: "", type: "restaurant", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Cain's Chapel United Methodist", address: "", description: "", type: "services", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "First Community Bank", address: "", description: "", type: "financial", location: {lat: 32.635853, lng: -86.3182195}}	,
		{name: "Fedcorp ATM", address: "", description: "", type: "financial", location: {lat: 32.635853, lng: -86.3182195}},
		{name: "Slapout Produce", address: "", description: "", type: "grocery", location: {lat: 32.635853, lng: -86.3182195}}
	]),
	headerTwo: ko.observable("Click on Location Markers for More Information."),
	mapText: ko.observable("Please wait while the map loads."),
	displayError: function(){
			this.headerTwo("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
			this.mapText("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
		}
};

ko.applyBindings(model);

      var map;
      function initMap() {
		try {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 32.635853, lng: -86.3182195},
				zoom: 17
			});
		}
		catch(err) {
			model.displayError();
		}		
	  }
	  
	  

var googleRequestTimeout = setTimeout(function(){
	model.displayError();
}, 6500);
//if the map variable has been defined within 5 seconds, clear the timeout function that checks google api.
setTimeout(function(){
	if (map != undefined)
	clearTimeout(googleRequestTimeout);
}, 5000);

setTimeout(function(){
	console.log(map);
}, 5000);
