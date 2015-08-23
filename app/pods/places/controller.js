import Ember from 'ember';
var Place = Ember.Object.extend({id: '', name: ''});

export default Ember.Controller.extend({
	actions: {
		itemSelected: function (item) {
			//console.log('itemSelected triggered');
			console.log(item.get('id'));
			this.set('model', item);
		},
		refreshOptions: function (inputVal) {
			//console.log('refreshOptions triggered');
			var placeList = [];
			var self = this;
			var triggerSuggestions = this.get('triggerSuggestions');
			var places = this.store.query('place', {searchName: inputVal, limit: 5}).then(function (places) {
				places.forEach(function (item) {
					var full = item.get('name');
					placeList.pushObject(Place.create({
						id: item.get('id'),
						name: full
					}));
				});
				self.set('places', placeList);
				triggerSuggestions = triggerSuggestions + 1;
				//console.log('set triggerSuggestions' + triggerSuggestions);
				self.set('triggerSuggestions', triggerSuggestions);
			});
		}
	},
	triggerSuggestions: 1
});
