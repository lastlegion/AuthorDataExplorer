var React = require('react');

var ConfigStore = require('./stores/ConfigStore.jsx');
var Highlight = require('react-highlight');
var Finish = React.createClass({
  render: function(){
    var dataSourceConfig = ConfigStore.getDataSourceConfig();
    var interactiveFiltersConfig = ConfigStore.getInteractiveFiltersConfig();
    var visualizationConfig = ConfigStore.getVisualizationsConfig();

    return(

      <div>
        <Highlight className='javascript'>
          {JSON.stringify(dataSourceConfig, null, 2)}
        </Highlight>
        <Highlight className='javascript'>
          {JSON.stringify(interactiveFiltersConfig, null, 2)}

        </Highlight>

        <Highlight className='javascript'>
          {JSON.stringify(visualizationConfig, null, 2)}
        </Highlight>

      </div>
    )

  }
})

module.exports = Finish;
