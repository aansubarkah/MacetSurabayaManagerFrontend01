//to make JSHint happy
/*global moment:false*/
/*global Hashids:false*/
import Ember from 'ember';
var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Controller.extend({
	//queryParams: ['page', 'limit', 'query', 'lastminutes'],
	geolocation: Ember.inject.service(),
	userLocation: null,
	//markersForDisplay: [],
	init: function () {
		var that = this;
		this.get('geolocation').getLocation().then(function () {
			var currentLocation = that.get('geolocation').get('currentLocation');
			that.set('userLocation', currentLocation);

			// if user share her location, relocate lat and lng, otherwise it will use defaul
			// value which is suarasurabaya office
			that.set('lat', currentLocation[0]);
			that.set('lng', currentLocation[1]);
			that.set('origin', currentLocation);
		});
	},
	queryParams: ['lastminutes'],
	lastminutes: 30,
	//classNames: ['select-picker', 'btn-group', 'form-control'],
	lat: -7.290293,
	lng: 112.727226,
	origin: [-7.290293, 112.727226],
	destination: [0, 0],
	avoidHighways: false,
	avoidTolls: false,
	zoom: 16,
	avoidsPicked: null,
	tolls:[
		{label: 'Avoid Tolls', value: 1},
	],
	highways:[
		{label: 'Avoid Highways', value: 1},
	],
	avoids: [
		{label: 'Avoid Tolls', value: 'Tolls'},
		{label: 'Avoid Highways', value: 'Highways'}
	],
	times: [
		{label: '30 minutes', value: 30},
		{label: '1 hour', value: 60},
		{label: '6 hours', value: 360},
		{label: '12 hours', value: 720},
		{label: '1 day', value: 1440},
		{label: '1 week', value: 10080}
	],
	actions: {
		pickAvoids(){
			console.log(options);
			//console.log(this.get('avoidsPicked'));
		},
		refreshPlace(lat, lng){
			this.set('lat', lat);
			this.set('lng', lng);
		},
		getOriginCoordinate(lat, lng){
			//console.log('origin lat:' + lat + ' lng:' + lng);
			this.set('origin', [lat, lng]);
		},
		getDestinationCoordinate(lat, lng){
			//console.log('destination lat:' + lat + ' lng:' + lng);
			this.set('destination', [lat, lng]);
		},
		getRoute(){
			//@todo refresh map before add route
			//@todo or remove route before adding
			//this.transitionToRoute('journey');
			this.set('routesForDisplay', []);
			var origin = this.get('origin');

			this.set('lat', origin[0]);
			this.set('lng', origin[1]);

			this.routesForDisplay.addObject({
				id: hashids.encode(new Date().getTime()),
				origin: this.get('origin'),
				destination: this.get('destination'),
				avoidHighways: this.get('avoidHighways'),
				avoidTolls: this.get('avoidTolls'),
				travelMode: 'driving',
				strokeColor: '#3333FF',
				strokeOpacity: 0.6,
				strokeWeight: 6,
				region: 'id'
			});
		}
	}
});
