import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'tr',
	init() {
		this._super(...arguments);
		this.set('isEditing', false);
		this.set('isShowingModal', false);
	},

	actions: {
		remove(){
			var user = this.get('user');
			this.sendAction('deleteDatum', user);
		},
		edit(){
			this.set('isEditing', true);
		},
		view(){
			this.set('isShowingModal', true);
		},
		save(){
			this.set('isEditing', false);
			var user = this.get('user');

			if (this.get('user.username').trim() === '') {
				this.sendAction('deleteDatum', user);
			} else {
				this.sendAction('editDatum', user);
			}

		},
		cancel(){
			this.set('isEditing', false);
		},
		toggleAddModal(){
			this.toggleProperty('isShowingModal');
		}
	}
});
