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

		return this.store.query('weather', query);
	},
	setupController: function (controller, model) {
		this._super.apply(this, arguments);
		controller.set('total', model.get('meta.total'));
	},
	queryParams: {
		page: {
			refreshModel: true
		},
		limit: {
			refreshModel: true
		}
	}
});
