var Reflux = require('reflux');

var ConfigActions = require('../actions/ConfigActions.jsx');

var _dataSource = {},
	_interactiveFilters = {},
	_visualizations = {};

var AppStore = Reflux.createStore({
	init: function(){
		this.listenTo(ConfigActions.dataSource, this.onDataSource);
    this.listenTo(ConfigActions.interactiveFilters, this.onInteractiveFilters);
    this.listenTo(ConfigActions.visualizations, this.onVisualizations);
	},
	onDataSource: function(config){
		var that = this;
		_dataSource = config;
		//that.trigger(data);
	},
	onInteractiveFilters: function(config){
		console.log(config)
		_interactiveFilters = config;
	},
	onVisualizations: function(config){
		console.log(config)
		_visualizations  = config;
		this.trigger(config)
	},
	getDataSourceConfig: function(){
		return _dataSource;
	},
	getInteractiveFiltersConfig: function(){
		return _interactiveFilters;
	},
	getVisualizationsConfig: function(){
		console.log(_visualizations)
		return _visualizations;
	}

});



module.exports = AppStore;
