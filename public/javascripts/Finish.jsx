var React = require('react');

var ConfigStore = require('./stores/ConfigStore.jsx');
var Highlight = require('react-highlight');
var Finish = React.createClass({
  componentDidMount: function(){
    var dataSourceConfig = ConfigStore.getDataSourceConfig();
    var interactiveFiltersConfig = ConfigStore.getInteractiveFiltersConfig();
    var visualizationConfig = ConfigStore.getVisualizationsConfig();
    var dataDescriptionConfig = this.generateDataDescription(interactiveFiltersConfig, visualizationConfig)

    this.setState({
      dataSourceConfig: dataSourceConfig,
      interactiveFiltersConfig: interactiveFiltersConfig,
      visualizationConfig: visualizationConfig,
      dataDescriptionConfig: dataDescriptionConfig
    });

  },
  getInitialState: function(){
    return{
      dataSourceConfig: {},
      dataDescriptionConfig: {},
      interactiveFiltersConfig: {},
      visualizationConfig: {}
    }
  },
  generateDataDescription: function(interactiveFiltersConfig, visualizationConfig){
    var attributes = [];
    for(var i in interactiveFiltersConfig){
      attributes.push({
        attributeName: interactiveFiltersConfig[i].attributeName,
        attributeType: ["filtering"]
      })
    };
    for(var i in visualizationConfig){
      var vis = visualizationConfig[i];
      for(var j in vis.attributes){
        var attribute  = vis.attributes[j];
        var filtering = false;

        //check if this attribute is in attributes
        for(var k in attributes){
          if(attributes[k].attributeName == attribute.attributeName){
            attributes[k].attributeType.push("visual");
            filtering = true;
          }
        }
        if(filtering == false){
          attributes.push({
            attributeName: attribute.attributeName,
            attributeType: ["visual"]
          })
        }

      }

    }
    return attributes;
  },
  render: function(){

    return(
      <div>
        <h1>Configuration Files</h1>
        <div className='col-md-5'>
          <h5>dataSource.json</h5>
          <Highlight className='javascript'>
            {JSON.stringify(this.state.dataSourceConfig, null, 2)}
          </Highlight>
          <h5>dataDescription.json</h5>
          <Highlight className='javascript'>
            {JSON.stringify(this.state.dataDescriptionConfig, null, 2)}
          </Highlight>
        </div>
        <div className='col-md-5'>
          <h5>interactiveFilters.json</h5>
          <Highlight className='javascript'>
            {JSON.stringify(this.state.interactiveFiltersConfig, null, 2)}
          </Highlight>
          <h5>visualization.json</h5>
          <Highlight className='javascript'>
            {JSON.stringify(this.state.visualizationConfig, null, 2)}
          </Highlight>
        </div>
      </div>
    )

  }
})

module.exports = Finish;
