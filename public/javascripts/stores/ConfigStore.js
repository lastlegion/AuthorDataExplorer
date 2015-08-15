var Reflux = require('reflux');

var ConfigActions = require('../actions/ConfigActions.jsx');

var _currentData = {};

var AppStore = Reflux.createStore({
	init: function(){
		this.listenTo(ConfigActions.dataSource, this.onDataSource);
    this.listenTo(ConfigActions.interactiveFilters, this.onInteractiveFilters);
    this.listenTo(ConfigActions.visualizations, this.onVisualizations);
	},
	onDataSourceConfig: function(data){
		var that = this;
		_currentData = data;
		that.trigger(data);
	},
	getData: function(){
		return _currentData;
	}

});



module.exports = AppStore;
