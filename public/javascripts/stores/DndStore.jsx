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
	onDeleteFilteringAttribute: function(props){
		//delete this prop from dropped array
		console.log(props)
		console.log(dropped)
		for(var i in dropped){
			var elem = dropped[i]
			console.log(elem.data.name);
			console.log(props.data.name)
			if(elem.data.name == props.data.name){
				console.log("splicing...")
				dropped.splice(i,1)
			}
		}
		console.log(dropped)

		this.trigger(props)
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
