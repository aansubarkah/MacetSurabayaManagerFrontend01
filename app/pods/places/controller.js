import Ember from 'ember';
var Place = Ember.Object.extend({id: '', name: ''});

export default Ember.Controller.extend({
	queryParams: ['page', 'limit', 'query'],
	page: 1,
	limit: 10,
	query: '',
	total: null,
	totalPages: function () {
		return Math.ceil(this.get('total') / this.limit);
	}.property('total'),
	firstRowNumber: function () {
		return (((this.page - 1) * this.limit) + 1);
	}.property('page', 'limit'),
	lastRowNumber: function () {
		var number = 0;
		if ((this.limit * this.page) > this.total) {
			number = this.total;
		} else {
			number = this.limit * this.page;
		}

		return number;
	}.property('page', 'total', 'limit'),
	geolocation: Ember.inject.service(),
	userLocation: null,
	lat: -7.290293,
	lng: 112.727226,
	newLat: 0,
	newLng: 0,
	zoom: 16,
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
		});
	},
	actions: {
		clickAction: function (e) {
			var that = this;
			/*that.routesForDisplay.addObject({
			 id: hashids.encode(new Date().getTime()),
			 origin: [-7.291820, 112.722176],
			 destination: [-7.372673, 112.729149],
			 travelMode: 'driving',
			 strokeColor: '#3333FF',
			 strokeOpacity: 0.6,
			 strokeWeight: 6,
			 region: 'id'
			 });*///don't remove above line, for educational purpose
			that.markersForDisplay.addObject({
				id: 0,
				lat: e.latLng.A,
				lng: e.latLng.F,
				title: 'New Marker',
				draggable: true,
				infoWindow: {
					content: 'Click or move the marker to display new marker form.',
					visible: true
				},
				click: function () {
					that.toggleProperty('isShowingModal');
					that.set('newLat', e.latLng.A);
					that.set('newLng', e.latLng.F);
				},
				dragend: function (f) {
					that.toggleProperty('isShowingModal');
					that.set('newLat', f.latLng.A);
					that.set('newLng', f.latLng.F);
				}
			});
		},
		refreshPlace(lat, lng){
			this.set('lat', lat);
			this.set('lng', lng);
		},
		itemSelected: function (item) {
			//console.log('itemSelected triggered');
			console.log(item.get('id'));
			this.set('model', item);
		},
		refreshOptions: function (inputVal) {
			//console.log('refreshOptions triggered');
			var placeList = [];
			var self = this;
			var triggerSuggestions = this.get('triggerSuggestions');
			var places = this.store.query('place', {searchName: inputVal, limit: 5}).then(function (places) {
				places.forEach(function (item) {
					var full = item.get('name');
					placeList.pushObject(Place.create({
						id: item.get('id'),
						name: full
					}));
				});
				self.set('places', placeList);
				triggerSuggestions = triggerSuggestions + 1;
				//console.log('set triggerSuggestions' + triggerSuggestions);
				self.set('triggerSuggestions', triggerSuggestions);
			});
		}
	},
	triggerSuggestions: 1
});
