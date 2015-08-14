import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//return this.store.findRecord('weather', params.weather_id);
		return this.store.findAll('weather');
	}
});
