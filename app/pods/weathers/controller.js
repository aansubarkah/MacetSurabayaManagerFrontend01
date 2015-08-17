import Ember from 'ember';


export default Ember.Controller.extend({
	needs: ['application'],
	//applicationController: Ember.inject.controller('application'),
	queryParams: ['page', 'limit'],
	//halaman: this.parent.pa
	//page: Ember.computed.reads('applicationController.page'),
	page: 1,
	limit: 5,
	total: null,
	totalPages: function () {
		return Math.ceil(this.get('total') / this.limit);
	}.property('total'),
	actions: {}
});
