import DS from 'ember-data';

export default DS.Model.extend({
	group: DS.belongsTo('group', {
		async: false
	}),
	group_id: DS.attr('number'),
	username: DS.attr('string'),
	password: DS.attr('string'),
	active: DS.attr('boolean', {defaultValue: 1})
});
