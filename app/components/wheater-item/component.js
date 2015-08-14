/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	classNameBindings: ['wheater.active:completed', 'isEditing:editing'],

	init() {
		this._super(...arguments);
		this.set('isEditing', false);
	},

	actions: {
		editTodo() {
			this.set('isEditing', true);
		},

		removeTodo() {
			var wheater = this.get('wheater');

			wheater.deleteRecord();
			wheater.save();
		},

		save() {
			this.set('isEditing', false);
			this.get('wheater').save();
		}
	}
});
