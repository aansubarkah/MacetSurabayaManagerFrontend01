//to make JSHint happy
/*global google:false*/

import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'input',
	classNames: ['form-control'],
	init() {
		this._super(...arguments);
	},
	didInsertElement: function () {
		var that = this;
		//this.value = 'halo dunia';
		var options = {
			types: ['geocode'],
			componentRestrictions: {country: 'id'}
		};
		var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);
		autocomplete.addListener('place_changed', function () {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				window.alert("Autocomplete's returned place contains no geometry");
				return;
			}

			var lat = place.geometry.location.A;
			var lng = place.geometry.location.F;
			console.info('Latitude: ' + place.geometry.location.A + " Longitude:" + place.geometry.location.F);
			that.sendAction('refreshPlace', lat, lng);
			//that.$().val();
		});
	}
});