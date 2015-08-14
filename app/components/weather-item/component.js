/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	classNameBindings: ['weather.active:completed', 'isEditing:editing'],

	init() {
		this._super(...arguments);
		this.set('isEditing', false);
	},

	actions: {
		editTodo() {
			this.set('isEditing', true);
		},

		removeTodo() {
			var weather = this.get('weather');

			weather.deleteRecord();
			weather.save();
		},

		save() {
			this.set('isEditing', false);
			this.get('weather').save();
		}
	}
});
