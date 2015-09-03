//to make JSHint happy
/*global moment:false*/
import Ember from 'ember';
moment.locale('id');

export default Ember.Component.extend({
	tagName: 'tr',
	init() {
		this._super(...arguments);
		this.set('isEditing', false);
		this.set('isShowingModal', false);
	},

	actions: {
		remove(){
			var markerview = this.get('markerview');
			this.sendAction('deleteDatum', markerview);
		},
		edit(){
			this.set('isEditing', true);
		},
		view(){
			this.set('isShowingModal', true);
		},
		save(){
			this.set('isEditing', false);
			var markerview = this.get('markerview');

			if (this.get('markerview.name').trim() === '') {
				this.sendAction('deleteDatum', markerview);
			} else {
				this.sendAction('editDatum', markerview);
			}

		},
		toggleCreateNewMarker(){
			var markerview = this.get('markerview');
			this.sendAction('toggleCreateNewMarker', markerview);
		},
		cancel(){
			this.set('isEditing', false);
		},
		toggleAddModal(){
			this.toggleProperty('isShowingModal');
		},
		refreshMarkerview(){
			var lat = this.get('markerview.lat');
			var lng = this.get('markerview.lng');
			this.sendAction('refreshMarkerview', lat, lng);
		}
	}
});
