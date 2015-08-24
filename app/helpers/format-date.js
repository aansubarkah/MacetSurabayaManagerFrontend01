//to make JSHint happy
/*global moment:false*/
import Ember from 'ember';

//export function formatDate(params/*, hash*/) {
  //return params;
//}

export default Ember.Handlebars.makeBoundHelper(function(date){
	return moment(date).fromNow();
});
//export default Ember.Helper.helper(formatDate);
