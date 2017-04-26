var model = {
	locations: ko.observableArray([
		{name: "Piggly Wiggly", address: "9985 Holtville Rd, Wetumpka AL 36092", wiki: "Piggly_Wiggly", filter: "Grocery Stores", location: {lat: 32.635127, lng: -86.318694}, visible: ko.observable(true)},
		{name: "Dollar General", address: "215 Lightwood Rd, Deatsville AL 36022", wiki: "", filter: "Stores and Retail", location: {lat: 32.638026, lng: -86.320502}, visible: ko.observable(true)},
		{name: "Subway", address: "9995 Holtville Rd, Wetumpka AL 36092", wiki: "", filter: "Restaurants", location: {lat: 32.635067, lng: -86.318432}, visible: ko.observable(true)},
		{name: "Sheila's Pizza", address: "119 Lightwood Rd, Deatsville AL 36022", wiki: "", filter: "Restaurants", location: {lat: 32.637098, lng: -86.319433}, visible: ko.observable(true)},
		{name: "Lake Pharmacy", address: "95 Lightwood Rd, Deatsville AL 36022", wiki: "", filter: "Stores and Retail", location: {lat: 32.636743, lng: -86.319239}, visible: ko.observable(true)},
		{name: "DeVaugn Realty", address: "75 Lightwood Road, Deatsville AL 36022", wiki: "", filter: "Misc. Services", location: {lat: 32.636619, lng: -86.318983}, visible: ko.observable(true)},
		{name: "El Patron", address: "65 Lightwood Rd, Deatsville AL 36022", wiki: "", filter: "Restaurants", location: {lat: 32.636439, lng: -86.319039}, visible: ko.observable(true)},
		{name: "Cain's Chapel United Methodist", address: "96 Lightwood Road, Deatsville AL 36022", wiki: "", filter: "Misc. Services", location: {lat: 32.637027, lng: -86.318399}, visible: ko.observable(true)},
		{name: "First Community Bank", address: "9788 Holtville Road, Wetumpka AL 36092", wiki: "", filter: "Banks and Financing", location: {lat: 32.635064, lng: -86.315665}, visible: ko.observable(true)}	,
		{name: "Fedcorp ATM", address: "9985 Holtville Rd, Wetumpka, AL 36092", wiki: "", filter: "Banks and Financing", location: {lat: 32.635461, lng: -86.318572}, visible: ko.observable(true)},
		{name: "Slapout Produce", address: "10031 Holtville Rd, Deatsville AL 36022", wiki: "", filter: "Grocery Stores", location: {lat: 32.635557, lng: -86.319625}, visible: ko.observable(true)}
	]),
	filter: ko.observableArray([
		{name: "Everything", type: "All"},
		{name: "Grocery Stores", type: "grocery"},
		{name: "Stores and Retail", type: "store"},
		{name: "Misc. Services", type: "services"},
		{name: "Banks and Financing", type: "financial"},
		{name: "Restaurants", type: "restaurant"}		
	]),
	headerTwo: ko.observable("Click on Location Markers for More Information."),
	mapText: ko.observable("Please wait while the map loads."),
	filterSelect: ko.observable("Everything"),
	wikiURL: ko.observable(""),
	updateList: function(){
		for (i = 0; i < this.locations().length; i++){
			if (this.filterSelect() == this.locations()[i].filter || this.filterSelect() == "Everything"){
				this.locations()[i].visible(true);
			}
			else{
				this.locations()[i].visible(false);				
			}
		}
		filterMarkers();
	},
	clickLoc: function(data) {
		var thisItem = data.wiki;
		this.wikiURL = "https://en.wikipedia.org/w/api.php?action=query&titles=" + thisItem + "&prop=revisions&rvprop=content&format=json";
		console.log(data.wiki + " " + this.wikiURL);
	},
	displayError: function(){
		this.headerTwo("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
		this.mapText("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
	}
};

ko.applyBindings(model);

      var map;
	  var markers = [];	  
      function initMap() {
		try {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 32.635853, lng: -86.3182195},
				zoom: 17
			});
			for (i = 0; i < model.locations().length; i++){
				var thisMarker = new google.maps.Marker({
					position: model.locations()[i].location,
					map: map,
					title: model.locations()[i].name,
					animation: google.maps.Animation.DROP,
					id: i
				});
				markers.push(thisMarker);
			}
		}
		catch(err) {
			model.displayError();
		}
	  }
	  var filterMarkers = function(){	  
			for (i = 0; i < model.locations().length; i++){
				for (j = 0; j < markers.length; j++){
					if (model.locations()[i].name == markers[j].title){
						if (model.locations()[i].visible() == true){
							markers[j].setMap(map);
						}else{
							markers[j].setMap(null);
						}
					}
				}
			}		
	  }	  
//Prepare an error to display if the map has not been populated yet. If the map does populate, this time out function will be cleared.
var googleRequestTimeout = setTimeout(function(){
	model.displayError();
}, 6500);
//if the map variable has been defined within 5 seconds, clear the timeout function that checks google api.
setTimeout(function(){
	if (map != undefined)
	clearTimeout(googleRequestTimeout);
}, 5000);

