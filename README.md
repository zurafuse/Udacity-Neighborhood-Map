# Udacity Neighborhood Map Project

This is a single page application featuring a map of my neighborhood for the Udacity API course. Functionality includes highlighted locations, third-party data about those locations and various ways to browse the content.

## How to Get Started

Clone my [Neighborhood Map repository](https://github.com/zurafuse/Udacity-Neighborhood-Map) or download the zip file. Run index.html in the parent directly to start the app.

## Resources

[Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) 

[Google Maps API](https://developers.google.com/maps/)

[Knockout javascript library](http://knockoutjs.com/)

[jQuery javascript library](https://jquery.com/)

## Hosted Version of Project

[Click here to view the hosted version of Tim Horton's project.](http://www.zurafuse.com/portfolio/slapout/)

## How to Run the Project

* Run index.html in the parent directory to start the app or visit the live hosted version at [www.zurafuse.com/portfolio/slapout/](http://www.zurafuse.com/portfolio/slapout/)
* Ensure that the map of Slapout, Alabama appears. Do something to break the code and you will see a message appear explaining that the Google Maps API is not available at the moment.
* Ensure that markers appear on the map for all positions in the model.locations array.
* Select a filter in the drop down filter and ensure that the markers and list view filter correctly.
* Click a list view item or a marker and make sure the Wikipedia article section populates with an article. Do something to break the code and see a polite message appear explaining that Wikipedia's API is not available at the moment.
* When you click on a marker or list item, make sure the related marker bounces in response. You should also an info window pop up containing the "title" that was returned from the Wikipedia API response.
* Make sure the map can be visible on a mobile device when the "HIDE MENU" button is pressed. Press the "SHOW MENU" icon to display the menu again.
* Review the javascript code and make sure values that change the DOM view are being monitored as knockout.js observables.