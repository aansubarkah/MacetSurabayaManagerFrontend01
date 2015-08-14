/**
 * Created by aan on 14/08/15.
 */
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	active: DS.attr('boolean', { defaultValue: true })
});
