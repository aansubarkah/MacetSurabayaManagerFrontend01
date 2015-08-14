/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

//var isEmpty = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var computed = Ember.computed;
var service = Ember.inject.service;

export default Ember.Component.extend({
	store: service(),

	filtered: computed('weathers.@each.isCompleted', 'filter', function () {
		var filter = this.get('filter');
		var all = this.get('weathers');

		if (filter === 'all') {
			return all;
		}

		return all.filterBy('active', filter === 1);
	}),

	active: filterBy('weathers', 'active', true),
	//active: filterBy('weathers', 'isCompleted', false),

	inflection: computed('active.[]', function () {
		var active = this.get('active.length');
		return active === 1 ? 'item' : 'items';
	}).readOnly(),

	actions: {
		createWeather() {
			const store = this.get('store');

			// Get the weather title set by the "New Weather" text field
			var name = this.get('newName');

			if (name && !name.trim()) {
				this.set('newName', '');
				return;
			}

			// Create the new Weather model
			var weather = store.createRecord('weather', {
				name: name
			});

			// Clear the "New Weather" text field
			this.set('newName', '');

			// Save the new model
			weather.save();
		}
	}
});
