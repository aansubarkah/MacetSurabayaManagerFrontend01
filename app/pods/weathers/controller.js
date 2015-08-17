import Ember from 'ember';


export default Ember.Controller.extend({
	queryParams: ['page'],
	page: 1,
	limit: 5,
	total: null,
	prevPage: function () {
		return this.get('page') - 1;
	}.property('page'),
	nextPage: function () {
		return this.get('page') + 1;
	}.property('page'),
	isFirstPage: function () {
		return this.get('page') === 1;
	}.property('page'),
	isLastPage: function () {
		return this.get('page') >= this.get('total');
	}.property('page', 'total'),
	pageRange: function () {
		var result = Ember.A();
		var totalPage = Math.ceil(this.get('total') / this.limit);
		for (var i = 1; i <= totalPage; i++) {
			result.push(i);
		}
		return result;
	}.property('total')
});
