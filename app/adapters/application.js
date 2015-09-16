/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	session: Ember.inject.service('session'),
	authorizer: 'simple-auth-authorizer:token',
	headers: Ember.computed('session', function () {
		return {
		};
	}),
	shouldReloadAll: function () {
		return false;
	},
	shouldBackgroundReloadRecord: function () {
		return false;
	},
	//namespace: 'manager',
	//host: 'http://apitraffic.aansubarkah.net',
	host: 'http://localhost:8765',// @todo change this on production server
	/*ajax: function (url, method, hash) {
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: false};
		return this._super(url, method, hash);
	}*/
});
