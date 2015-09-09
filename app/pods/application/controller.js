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
	username: "John Doe",
	page: 1,
	limit: 1,
	actions: {
		doRefresh: function () {
			this.get('target.router').refresh();
		}
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
