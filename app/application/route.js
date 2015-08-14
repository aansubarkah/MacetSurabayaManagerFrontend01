/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		state: { refreshModel: true }
	}

	// @todo change this model section
	/*model(params) {
		return this.store.findAll('wheater').then((wheaters) => {
			return {
				all: wheaters,
				filter: params.state
			};
		});
	}*/
});
