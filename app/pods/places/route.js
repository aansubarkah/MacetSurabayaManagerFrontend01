//to make JSHint happy
/*global Hashids:false*/
import Ember from 'ember';
var hashids = new Hashids("m4c3tsur4b4y4");
/*
 * 1) determineSuggestions: this function will determine how the list
 * of options is filtered as the user enters text (it gets passed the
 * available options and the users input)
 2) valueProperty: this string should be the value property for the
 options passed in (think selectbox value/label)
 * */
export default Ember.Route.extend({
	model: function (params) {
		var query = {};
		if (Ember.isPresent(params.page)) {
			query.page = params.page;
		}
		if (Ember.isPresent(params.limit)) {
			query.limit = params.limit;
		}
		if (Ember.isPresent(params.query)) {
			query.query = params.query;
		}

		return Ember.RSVP.hash({
			place: this.store.query('place', query)
		});
	},
	setupController: function (controller, model) {
		controller.set('total', model.place.get('meta.total'));
		controller.set('place', model.place);
		var places = [];
		controller.set('places', places);

		// ---------------------------------------------------------
		// ------------- create markers to display on maps ---------
		// ---------------------------------------------------------
		var markersForDisplay = [];
		model.place.forEach(function (item) {
			var result = {
				id: hashids.encode(item.get('id')),
				lat: item.get('lat'),
				lng: item.get('lng'),
				infoWindow: {
					content: "<p><strong>" +item.get('name')+"</strong>",
					visible: false
				}
			};
			markersForDisplay.push(result);
		});
		controller.set('markersForDisplay', markersForDisplay);
	},
	queryParams: {
		page: {
			refreshModel: true
		},
		limit: {
			refreshModel: true
		},
		query: {
			refreshModel: true
		}
	}
});
