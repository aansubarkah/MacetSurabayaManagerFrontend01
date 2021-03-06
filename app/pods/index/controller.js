//to make JSHint happy
/*global Hashids:false*/
import Ember from 'ember';
var hashids = new Hashids("m4c3tsur4b4y4");
var Category = Ember.Object.extend({id: '', name: ''});
var Weather = Ember.Object.extend({id: '', name: ''});
var Respondent = Ember.Object.extend({id: '', name: ''});

export default Ember.Controller.extend({
	geolocation: Ember.inject.service(),
	userLocation: null,
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
	queryParams: ['lastminutes'],
	lastminutes: 30,
	lat: -7.290293,
	lng: 112.727226,
	newLat: 0,
	newLng: 0,
	zoom: 16,
	isShowingModal: false,
	triggerSuggestions: 1,
	actions: {
		clickAction: function (e) {
			var that = this;

			that.markersForDisplay.addObject({
				id: hashids.encode(new Date().getTime()),
				lat: e.latLng.G,
				lng: e.latLng.K,
				title: 'New Marker',
				draggable: true,
				infoWindow: {
					content: 'Click or move the marker to display new marker form.',
					visible: true
				},
				click: function () {
					that.toggleProperty('isShowingModal');
					that.set('newLat', e.latLng.G);
					that.set('newLng', e.latLng.K);
				},
				dragend: function (f) {
					that.toggleProperty('isShowingModal');
					that.set('newLat', f.latLng.G);
					that.set('newLng', f.latLng.K);
				}
			});
		},
		itemSelectedCategory: function (item) {
			console.log(item.get('id'));
			this.set('category', item);
		},
		refreshOptionsCategory: function (inputVal) {
			var categoryList = [];
			var self = this;
			var triggerSuggestions = this.get('triggerSuggestions');
			var categories = this.store.query('category', {searchName: inputVal, limit: 3}).then(function (categories) {
				categories.forEach(function (item) {
					var full = item.get('name');
					categoryList.pushObject(Category.create({
						id: item.get('id'),
						name: full
					}));
				});
				self.set('categories', categoryList);
				triggerSuggestions = triggerSuggestions + 1;
				self.set('triggerSuggestions', triggerSuggestions);
			});
		},
		itemSelectedWeather: function (item) {
			this.set('weather', item);
		},
		refreshOptionsWeather: function (inputVal) {
			var weatherList = [];
			var self = this;
			var triggerSuggestions = this.get('triggerSuggestions');
			var weathers = this.store.query('weather', {searchName: inputVal, limit: 3}).then(function (weathers) {
				weathers.forEach(function (item) {
					var full = item.get('name');
					weatherList.pushObject(Weather.create({
						id: item.get('id'),
						name: full
					}));
				});
				self.set('weathers', weatherList);
				triggerSuggestions = triggerSuggestions + 1;
				self.set('triggerSuggestions', triggerSuggestions);
			});
		},
		itemSelectedRespondent: function (item) {
			this.set('respondent', item);
		},
		refreshOptionsRespondent: function (inputVal) {
			var respondentList = [];
			var self = this;
			var triggerSuggestions = this.get('triggerSuggestions');
			var respondents = this.store.query('respondent', {
				searchName: inputVal,
				limit: 3
			}).then(function (respondents) {
				respondents.forEach(function (item) {
					respondentList.pushObject(Respondent.create({
						id: item.get('id'),
						name: item.get('name'),
						contact: item.get('contact')
					}));
				});
				self.set('respondents', respondentList);
				triggerSuggestions = triggerSuggestions + 1;
				self.set('triggerSuggestions', triggerSuggestions);
			});
		},
		createNew(dataToSave){
			const store = this.get('store');
			var that = this;

			var marker = store.createRecord('marker', dataToSave);

			// @todo clear text field
			this.set('isShowingModal', false);

			marker.save().then(function () {
				// @warn refresh template
				that.get('target.router').refresh();
			});
		},
		refreshPlace(lat, lng){
			this.set('lat', lat);
			this.set('lng', lng);
		}
	}
});
