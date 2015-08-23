import Ember from 'ember';
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
			model: this.store.query('place', query)
		});
	},
	setupController: function (controller, hash) {
		controller.set('model', hash.model);
		var places = [];
		controller.set('places', places);
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
