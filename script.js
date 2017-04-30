//values that could change the DOM when updated are handled in this model as ko observables.
var model = {
	//the locations array contains all the places of interest on the map.
	locations: ko.observableArray([
		{name: "Piggly Wiggly", address: "9985 Holtville Rd, Wetumpka AL 36092", wiki: "Piggly_Wiggly", filter: "Grocery Stores", location: {lat: 32.635127, lng: -86.318694}, visible: ko.observable(true)},
		{name: "Dollar General", address: "215 Lightwood Rd, Deatsville AL 36022", wiki: "Dollar_General", filter: "Stores and Retail", location: {lat: 32.638026, lng: -86.320502}, visible: ko.observable(true)},
		{name: "Subway", address: "9995 Holtville Rd, Wetumpka AL 36092", wiki: "Subway_(restaurant)", filter: "Restaurants", location: {lat: 32.635067, lng: -86.318432}, visible: ko.observable(true)},
		{name: "Sheila's Pizza", address: "119 Lightwood Rd, Deatsville AL 36022", wiki: "Pizza", filter: "Restaurants", location: {lat: 32.637098, lng: -86.319433}, visible: ko.observable(true)},
		{name: "Lake Pharmacy", address: "95 Lightwood Rd, Deatsville AL 36022", wiki: "Pharmacies_in_the_United_States", filter: "Stores and Retail", location: {lat: 32.636743, lng: -86.319239}, visible: ko.observable(true)},
		{name: "El Patron", address: "65 Lightwood Rd, Deatsville AL 36022", wiki: "Holtville,_Alabama", filter: "Restaurants", location: {lat: 32.636439, lng: -86.319039}, visible: ko.observable(true)},
		{name: "Cain's Chapel United Methodist", address: "96 Lightwood Road, Deatsville AL 36022", wiki: "United_Methodist_Church", filter: "Misc. Services", location: {lat: 32.637027, lng: -86.318399}, visible: ko.observable(true)},
		{name: "First Community Bank", address: "9788 Holtville Road, Wetumpka AL 36092", wiki: "Bank", filter: "Banks and Financing", location: {lat: 32.635064, lng: -86.315665}, visible: ko.observable(true)}	,
		{name: "Slapout Produce", address: "10031 Holtville Rd, Deatsville AL 36022", wiki: "Fruit_stand", filter: "Grocery Stores", location: {lat: 32.635557, lng: -86.319625}, visible: ko.observable(true)}
	]),
	filter: ko.observableArray([
		{name: "Everything", type: "All"},
		{name: "Grocery Stores", type: "grocery"},
		{name: "Stores and Retail", type: "store"},
		{name: "Misc. Services", type: "services"},
		{name: "Banks and Financing", type: "financial"},
		{name: "Restaurants", type: "restaurant"}		
	]),
	markers: ko.observableArray([]),
	headerTwo: ko.observable("Click on Location Markers for More Information."),
	mapText: ko.observable("Please wait while the map loads."),
	filterSelect: ko.observable("Everything"),
	wikiContent: ko.observable(" "),
	wikiName: ko.observable(" "),
	//this function is called whenever a user selects an option from the filter. If the chosen filter matches the 
	//filter property of the current location property in the loop, make sure that location entry is "visible".
	//Otherwise, make it not visible.
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
	//this function is called whenever a user clicks on a list item or a marker. The clicked location or maker is passed as
	//an object to this function, as the input argument.
	clickLoc: function(data) {
		var thisItem = data.wiki;
		var wikiURL = ("https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&titles=" + thisItem + "&prop=extracts&format=json");
		//prepare a message to appear in case the Wikipedia API does not respond in a timely manner.
		var wikiTimeBomb = setTimeout(function(){
			model.wikiContent("<div class='current-article'><p>We are sorry, but Wikipedia content is not available at the moment. Try again soon.</p></div>");
		}, 7000);
		//retrieve info from Wikipedia's API
		$.ajax({
			url: wikiURL, 
			type: "GET", 
			success: function(data){
				var object = data.query.pages;
				var objectArray = Object.keys(object);
				//Loop through the "pages" returned from Wikipedia's response and pull an extract to populate the wikiContent and wikiName properties.
				//This content will be used to display an article on the page.
				objectArray.forEach(function(key) {
					model.wikiContent(object[key].extract);
					model.wikiName(object[key].title);				
					for (i = 0; i < model.markers().length; i++){
						if (thisItem == model.markers()[i].wiki){
							model.markers()[i].setAnimation(google.maps.Animation.BOUNCE);
							infowindow = new google.maps.InfoWindow({
							content: model.wikiName()
							});	
							infowindow.open(map, model.markers()[i]);
						}
						else{
							model.markers()[i].setAnimation(null);
						}
					}
					//if this response was successful, we can prevent the error message from appearing on the screen.
					clearTimeout(wikiTimeBomb);
				});				
		}}).fail(function(){
				model.wikiContent("<div class='current-article'><p>We are sorry, but Wikipedia content is not available at the moment. Try again soon.</p></div>");
			});
		//cause the selected marker to bounce. Turn off the animation for all other markers.
		for (i = 0; i < model.markers().length; i++){
			if (thisItem == model.markers()[i].wiki){
				model.markers()[i].setAnimation(google.maps.Animation.BOUNCE);
			}
			else{
				model.markers()[i].setAnimation(null);
			}
		}
	},
	//if the user clicks the HIDE MENU button, hide the menu. If the SHOW MENU button is pressed, display the menu again.
	toggleMenu: function(){
		if ($(".side-items").css("display") == "none"){
			$(".hide-button").html("HIDE MENU");
			$(".side-items").show();
		}
		else{
			$(".side-items").hide();	
			$(".hide-button").html("SHOW MENU");
		}
	},
	//Display this error if the Google Maps initMap function fails for any reason.
	displayError: function(){
		this.headerTwo("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
		this.mapText("The Google Maps API is currently unavailable or unresponsive. Please try again later.");
	}
};

ko.applyBindings(model);

//Create the map via Google Maps API, and create markers for each location.
var map;  
function initMap() {
	try {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 32.635853, lng: -86.3182195},
			zoom: 16
		});
		infowindow = new google.maps.InfoWindow({
			content: "Loading..."
		});	
		for (i = 0; i < model.locations().length; i++){
			var thisMarker = new google.maps.Marker({
				position: model.locations()[i].location,
				map: map,
				title: model.locations()[i].name,
				wiki: model.locations()[i].wiki,
				animation: google.maps.Animation.DROP,
				id: i,
			});
			model.markers().push(thisMarker);
			thisMarker.addListener("click", function(){
				model.clickLoc(this);
			});
		}
	}
	catch(err) {
		model.displayError();
	}
}
//This function makes markers visible if they match the selected filter,
//and hides them if they do not match the selected filter.
var filterMarkers = function(){	  
	for (i = 0; i < model.locations().length; i++){
		for (j = 0; j < model.markers().length; j++){
			if (model.locations()[i].name == model.markers()[j].title){
				if (model.locations()[i].visible() == true){
					model.markers()[j].setMap(map);
				}else{
					model.markers()[j].setMap(null);
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

