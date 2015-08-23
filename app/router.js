import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.baseURL
});

Router.map(function () {
  this.route('weathers');
  this.route('weather');
  this.route('markers');
  this.route('marker');
  this.route('categories');
  this.route('category');
  this.route('users');
  this.route('user');
  this.route('respondents');
  this.route('respondent');
  this.route('groups');
  this.route('group');
  this.route('places');
  this.route('place');
});

export default Router;
