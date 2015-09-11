/**
 * Created by aan on 14/08/15.
 */
//import config from '../config/environment';
import Ember from 'ember';
import DS from 'ember-data';
//import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

/*export default ActiveModelAdapter.extend(DataAdapterMixin, {
 host: config.host,
 namespace: config.namespace,
 authorizer: 'simple-auth-authorizer:token',
 headers: Ember.computed('session', function () {
 return {
 // 'X-User-Id': this.session.get('user.id'),
 'Accept-Version': config.apiVersion
 };
 })
 });*/
//export default DS.Adapter.extend({
export default DS.RESTAdapter.extend(DataAdapterMixin, {
	//headers:Ember.computed('session')
	session: Ember.inject.service('session'),
	authorizer: 'simple-auth-authorizer:token',
	headers: Ember.computed('session', function () {
		return {
			//'Authorization': 'Bearer ' + this.session.get('token')
			//'Bearer ': this.session.get('token')
			// 'X-User_Id':this.session.get('user.id'),
			//'Accept-Version':config.apiVersion
		};
	}),
	shouldReloadAll: function () {
		return false;
	},
	shouldBackgroundReloadRecord: function () {
		return false;
	},
	namespace: 'manager',
	//host: 'http://apitraffic.aansubarkah.net',
	host: 'http://localhost:8765',// @todo change this on production server
	/*ajax: function (url, method, hash) {
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: false};
		return this._super(url, method, hash);
	}*/
});
