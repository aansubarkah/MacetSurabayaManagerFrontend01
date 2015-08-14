/**
 * Created by aan on 14/08/15.
 */
import DS from 'ember-data';

export default DS.Adapter.extend({
	//export default DS.RESTAdapter.extend({
	//shouldReloadAll(){return false;}
	shouldReloadAll: function () {
		return false;
	},
	shouldBackgroundReloadRecord: function () {
		return false;
	},
	host: 'http://localhost:8765',
	ajax: function (url, method, hash) {
		//"Accept": "application/json",
		//"Content-Type": "application/json"
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: false};
		return this._super(url, method, hash);
	}
	/*shouldReloadAll() {
	 //silence ember-data deprecation
	 return true;
	 },
	 findAll() {
	 // rather then doing an ajax, just echo back the default data

	 return [
	 {
	 id: '1',
	 name: 'install ember-cli',
	 active: true
	 },
	 {
	 id: '2',
	 name: 'install additional dependencies',
	 active: true
	 },
	 {
	 id: '3',
	 name: 'develop amazing things',
	 active: false
	 }
	 ];
	 },

	 createRecord(store, type, snapshot) {
	 // rather then doing an ajax, just echo back the data that was created
	 var record = snapshot.record;
	 var json = record.toJSON();

	 // assign a unique ID like the server would
	 json.id = Date.now();

	 // return a value or a promise
	 return json;
	 },

	 updateRecord(store, type, snapshot) {
	 // rather then doing an ajax, just echo back the data that was updated
	 var record = snapshot.record;
	 var json = record.toJSON();

	 json.id = record.id;

	 return json;
	 },

	 deleteRecord(store, type, snapshot) {
	 var record = snapshot.record;

	 return { id: record.id };
	 }*/
});
