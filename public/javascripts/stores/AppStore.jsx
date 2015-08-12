var Reflux = require('reflux');

var AppActions = require('../actions/AppActions.jsx');

var _currentData = {};

var AppStore = Reflux.createStore({
	init: function(){
		this.listenTo(AppActions.dataSourceConfig, this.onDataSourceConfig);
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
