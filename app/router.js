import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.baseURL
});

Router.map(function () {
	//this.resource('weathers');
	this.route('weathers');
	this.route('weather');
});

export default Router;
