/**
 * Created by aan on 14/08/15.
 */
import DS from 'ember-data';

//export default DS.Adapter.extend({
export default DS.RESTAdapter.extend({
	//shouldReloadAll(){return false;}
	shouldReloadAll: function () {
		return false;
	},
	shouldBackgroundReloadRecord: function () {
		return false;
	},
	namespace: 'manager',
	host: 'http://localhost:8765',
	ajax: function (url, method, hash) {
		//"Accept": "application/json",
		//"Content-Type": "application/json"
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: false};
		return this._super(url, method, hash);
	}
});
