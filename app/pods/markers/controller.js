import Ember from 'ember';
var Category = Ember.Object.extend({id: '', name: ''});
var Weather = Ember.Object.extend({id: '', name: ''});
var Respondent = Ember.Object.extend({id: '', name: ''});

export default Ember.Controller.extend({
	lat: -7.290293,
	lng: 112.727226,
	newLat: 0,
	newLng: 0,
	zoom: 16,
	markersForDisplay: Ember.A([]),
	isShowingModal: false,
	triggerSuggestions: 1,
	actions: {
		clickAction: function (e) {
			var that = this;
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
			/*this.set('newMarker', Ember.A([
			 {
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
			 }
			 ]));*/
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
			console.log(item.get('id'));
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
			console.log(item.get('id'));
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
					var full = item.get('name');
					respondentList.pushObject(Respondent.create({
						id: item.get('id'),
						name: full
					}));
				});
				self.set('respondents', respondentList);
				triggerSuggestions = triggerSuggestions + 1;
				self.set('triggerSuggestions', triggerSuggestions);
			});
		},
		createNew(dataToSave){
			console.log(dataToSave);
		}
	}
});
/*
 *
 Jalan Wonokitri Besar No.40-C
 Kecamatan Sawahan, Kota Surabaya, Jawa Timur 60256
 -7.290293, 112.727226
 API:AIzaSyA7dciHJOSiR8annWOSISIdKFF6T3cuyMQ
 */
