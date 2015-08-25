//to make JSHint happy
/*global moment:false*/
import Ember from 'ember';
moment.locale('id');

export default Ember.Route.extend({
	model: function (params) {
		var query = {};
		//@warn do not remove followed lines
		/*if (Ember.isPresent(params.page)) {
		 query.page = params.page;
		 }
		 if (Ember.isPresent(params.limit)) {
		 query.limit = params.limit;
		 }
		 if (Ember.isPresent(params.query)) {
		 query.query = params.query;
		 }*/
		if (Ember.isPresent(params.lastminutes)) {
			query.lastminutes = params.lastminutes;
		}

		return Ember.RSVP.hash({
			marker: this.store.query('marker', query),
			category: this.store.query('category', query),
			weather: this.store.query('weather', query),
			respondent: this.store.query('respondent', query)
		});

	},
	setupController: function (controller, model) {
		controller.set('marker', model.marker);
		var markers = [];
		controller.set('markers', markers);
		controller.set('category', model.category);
		var categories = [];
		controller.set('categories', categories);
		controller.set('weather', model.weather);
		var weathers = [];
		controller.set('weathers', weathers);
		controller.set('respondent', model.respondent);
		var respondents = [];
		controller.set('respondents', respondents);

		// ---------------------------------------------------------
		// ------------- create markers to display on maps ---------
		// ---------------------------------------------------------
		var markersForDisplay = [];
		model.marker.forEach(function (item) {
			var isPinned = "Tidak";
			var isCleared = "Belum";

			if (item.get('pinned')) {
				isPinned = "Ya";
			}

			if (item.get('cleared')) {
				isCleared = "Ya";
			}

			var result = {
				id: item.get('id'),
				lat: item.get('lat'),
				lng: item.get('lng'),
				title: item.get('category.name'),
				icon: 'images/dark/' + item.get('category.id') + '.png',
				infoWindow: {
					content: "<p><strong>Waktu:&nbsp;</strong>" + moment(item.get('created')).fromNow() + "</p>" +
					"<p><strong>Keterangan:&nbsp;</strong>" +
					item.get('info') + "</p><p><strong>Cuaca:&nbsp</strong>" + item.get('weather.name') + "</p>" +
					"<p><strong>Permanen:&nbsp;</strong>" + isPinned + "</p><p><strong>Selesai:&nbsp;</strong>" +
					isCleared + "</p>",
					visible: false
				}
			};
			markersForDisplay.push(result);
		});
		controller.set('markersForDisplay', markersForDisplay);
	},
	queryParams: {
		/*page: {
		 refreshModel: true
		 },
		 limit: {
		 refreshModel: true
		 },
		 query: {
		 refreshModel: true
		 },*/
		lastminutes: {
			refreshModel: true
		}
	},
	afterModel: function () {
		var _this = this;
		return this.store.findAll('category').then(function (result) {
			_this.set('category', result);
		});
	}
})
;
