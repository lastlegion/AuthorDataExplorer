var Reflux = require('reflux');

var AppActions = require('../actions/AppActions.jsx');

var dropped = [];

var DndStore = Reflux.createStore({
	init: function(){
		this.listenTo(AppActions.dropFilteringAttribute, this.onDropFilteringAttribute);
	},
	onDropFilteringAttribute: function(props){
		//console.log(props);

		dropped.push(props);
		this.trigger(props);
	},
	isDropped: function(prop){
		//console.log(dropped)
		//console.log(prop)
		for(var i in dropped){
			var elem = dropped[i];
			//console.log(elem.data.name + " "+prop.data.name);
			if(elem.data.name == prop.data.name){
				return true;
			}
		}
		return false;
	},
	getDroppedList: function(){
		return dropped;
	}
})

module.exports = DndStore;
