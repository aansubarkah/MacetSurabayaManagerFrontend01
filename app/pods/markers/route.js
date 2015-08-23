import Ember from 'ember';

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
			marker: this.store.query('marker', query),
			category: this.store.query('category', query),
			weather: this.store.query('weather', query),
			respondent:this.store.query('respondent', query)
		});

	},
	setupController: function (controller, model) {
		controller.set('category', model.category);
		var categories = [];
		controller.set('categories', categories);
		controller.set('weather', model.weather);
		var weathers = [];
		controller.set('weathers', weathers);
		controller.set('respondent', model.respondent);
		var respondents=[];
		controller.set('respondents', respondents);
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
