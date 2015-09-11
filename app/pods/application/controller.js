/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session:main'),
	state: 'all',
	queryParams: [
		'state'
	],
	isManager: true,
	username: "John Doe",
	page: 1,
	limit: 1,
	init:function(){
		//console.log(this.get('session'));
	},
	actions: {
		doRefresh: function () {
			this.get('target.router').refresh();
		},
		invalidateSession: function () {
			this.get('session').invalidate();
			//this.transitionToRoute('index');
		}
	}
});
