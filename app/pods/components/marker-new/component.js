import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.set('isShowingModal', false);
		this.set('isShowingNewRespondent', false);
		this.set('triggerSuggestions', 1);
		this.set('newRespondentName', '');
		this.set('newRespondentContact', '');
		this.set('category_id', 1);
		this.set('respondent_id', 0);
		this.set('weather_id', 1);
		//this.set('lat', 0);
		//this.set('lng', 0);
		this.set('info', '');
		this.set('newPinned', false);
	},
	actions: {
		toggleAddModal(){
			this.toggleProperty('isShowingModal');
		},
		refreshOptionsCategory(inputVal){
			this.sendAction('refreshOptionsCategory', inputVal);
		},
		itemSelectedCategory(item){
			if (item.get('id') == 0) {
				return;
			}
			this.sendAction('itemSelectedCategory', item);
			this.set('category_id', item.get('id'));

		},
		refreshOptionsWeather(inputVal){
			this.sendAction('refreshOptionsWeather', inputVal);
		},
		itemSelectedWeather(item){
			if (item.get('id') == 0) {
				return;
			}
			this.sendAction('itemSelectedWeather', item);
			this.set('weather_id', item.get('id'));
		},
		refreshOptionsRespondent(inputVal){
			//console.log(inputVal);
			this.set('newRespondentName', inputVal);
			this.sendAction('refreshOptionsRespondent', inputVal);
		},
		itemSelectedRespondent(item){
			//console.log(item.length);
			if (item.get('id') == 0) {
				this.set('respondent_id', 0);
				this.toggleProperty('isShowingNewRespondent');
				this.$('#respondentContact').focus();
			} else {
				this.sendAction('itemSelectedRespondent', item);
				this.set('respondent_id', item.get('id'));
			}

		},
		createNew(){
			if (this.get('info') == '') {
				return;
			}

			var pinned = 0;
			if (this.get('newPinned')) {
				pinned = 1;
			}

			var dataToSave = {
				category_id: this.get('category_id'),
				respondent_id: this.get('respondent_id'),
				repondentName: this.get('newRespondentName'),
				repondentContact: this.get('newRespondentContact'),
				weather_id: this.get('weather_id'),
				lat: this.get('newLat'),
				lng: this.get('newLng'),
				info: this.get('info'),
				pinned: pinned
			};
			//console.log(dataToSend);
			this.sendAction('createNew', dataToSave);
		}
		//@todo if respondent doesn't exist, display contact and respondent's name input

	}
});
