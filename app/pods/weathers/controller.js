import Ember from 'ember';


export default Ember.Controller.extend({
	queryParams: ['page', 'limit', 'query'],
	page: 1,
	limit: 25,
	query: '',
	total: null,
	totalPages: function () {
		return Math.ceil(this.get('total') / this.limit);
	}.property('total'),
	firstRowNumber: function () {
		return (((this.page - 1) * this.limit) + 1);
	}.property('page', 'limit'),
	lastRowNumber: function () {
		var number = 0;
		(this.limit * this.page) > this.total ? number = this.total : number = (this.limit * this.page);
		return number;
	}.property('page', 'total', 'limit'),
	actions: {}
});
