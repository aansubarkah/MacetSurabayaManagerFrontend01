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
	isAddRowVisible: false,
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
		toggleAdd: function () {
			this.toggleProperty('isAddRowVisible');
		},
		clickAction: function (e) {
			var that = this;
			that.markersForDisplay.addObject({
				id: 0,
				lat: e.latLng.A,
				lng: e.latLng.F,
				title: 'New Place',
				draggable: true,
				infoWindow: {
					content: 'Click or move the marker to display new marker form.',
					visible: true
				},
				click: function () {
					that.toggleProperty('isAddRowVisible');
					that.set('newLat', e.latLng.A);
					that.set('newLng', e.latLng.F);
				},
				dragend: function (f) {
					that.toggleProperty('isAddRowVisible');
					that.set('newLat', f.latLng.A);
					that.set('newLng', f.latLng.F);
				}
			});
		},
		createNew: function () {
			const store = this.get('store');
			var that = this;

			// get name inputed, if blank return to input
			var name = this.get('newName');
			if (name && !name.trim()) {
				this.set('newName', '');
				return;
			}

			// create the new Weather model
			var place = store.createRecord('place', {
				name: name,
				lat: this.get('newLat'),
				lng: this.get('newLng')
			});

			// clear the "New Weather" text field
			this.set('newName', '');
			this.set('isAddRowVisible', false);

			place.save().then(function () {
				// refresh template
				that.transitionToRoute('places');
			});
		},
		deleteDatum: function (place) {
			var that = this;
			place.destroyRecord().then(function () {
				// refresh template
				that.transitionToRoute('places');
			});
		},
		editDatum: function (place) {
			place.save();
			// refresh template
			that.transitionToRoute('places');
		},
		refreshPlace(lat, lng){
			this.set('lat', lat);
			this.set('lng', lng);
		},
		itemSelected: function (item) {
			console.log(item.get('id'));
			this.set('model', item);
		},
		refreshOptions: function (inputVal) {
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
				self.set('triggerSuggestions', triggerSuggestions);
			});
		}
	},
	triggerSuggestions: 1
});
