var React = require('react');

var ConfigStore = require('./stores/ConfigStore.jsx');
var Finish = React.createClass({
  render: function(){
    var dataSourceConfig = ConfigStore.getDataSourceConfig();
    var interactiveFiltersConfig = ConfigStore.getInteractiveFiltersConfig();
    var visualizationConfig = ConfigStore.getVisualizationsConfig();

    return(

      <div>
        {JSON.stringify(dataSourceConfig, null, 2)}
        {JSON.stringify(interactiveFiltersConfig, null, 2)}
        {JSON.stringify(visualizationConfig, null, 2)}

  
      </div>
    )

  }
})

module.exports = Finish;
