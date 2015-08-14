/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

var isEmpty = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var computed = Ember.computed;
var service = Ember.inject.service;

export default Ember.Component.extend({
	store: service(),

	filtered: computed('wheaters.@each.isCompleted', 'filter', function () {
		var filter = this.get('filter');
		var all = this.get('wheaters');

		if (filter === 'all') {
			return all;
		}

		return all.filterBy('active', filter === 1);
	}),

	active: filterBy('wheaters', 'active', true),
	//active: filterBy('wheaters', 'isCompleted', false),

	inflection: computed('active.[]', function () {
		var active = this.get('active.length');
		return active === 1 ? 'item' : 'items';
	}).readOnly(),

	actions: {
		createWheater() {
			const store = this.get('store');

			// Get the wheater title set by the "New Wheater" text field
			var name = this.get('newName');

			if (name && !name.trim()) {
				this.set('newName', '');
				return;
			}

			// Create the new Wheater model
			var wheater = store.createRecord('wheater', {
				name: name
			});

			// Clear the "New Wheater" text field
			this.set('newName', '');

			// Save the new model
			wheater.save();
		}
	}
});
