/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
	state: 'all',
	queryParams: [
		'state'
	],
	isManager: true,
	username: "Aan Subarkah",
	page: 1,
	limit: 1,
	actions: {
		/*invalidateSession: function () {
			this.get('session').invalidate();
			this.transitionToRoute('/');
		}*/
	}
});
/*
 * actions: {
 invalidateSession: function () {
 this.get('session').invalidate();
 this.transitionToRoute('/');
 }
 }
 * */
