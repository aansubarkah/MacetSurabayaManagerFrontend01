/**
 * Created by aan on 14/08/15.
 */
// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		state: { refreshModel: true }
	},

	// @todo change this model section
	model(params) {
		return this.store.findAll('todo').then((todos) => {
			return {
				all: todos,
				filter: params.state
			};
		});
	}
});
