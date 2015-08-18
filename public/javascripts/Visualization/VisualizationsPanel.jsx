var React       = require('react');
var Glyphicon   = require('react-bootstrap').Glyphicon;
var jQuery      = require('jquery');
var Panel       = require('react-bootstrap').Panel;
var PanelGroup  = require('react-bootstrap').PanelGroup;
var Button      = require('react-bootstrap').Button;
var Table       = require('react-bootstrap').Table;
var TabbedArea  = require('react-bootstrap').TabbedArea;
var TabPane     = require('react-bootstrap').TabPane;
var Input       = require('react-bootstrap').Input;
var Highlight   = require('react-highlight'); //Syntax highlighting
var Modal       = require('react-bootstrap').Modal;

var AppStore    = require('../stores/AppStore.jsx');


//App components
var Attribute       = require('./Attribute.jsx');
var DataTable       = require('./Visualizations/DataTable.jsx');
var DataTableConfig = require('./Configs/DataTableConfig.jsx');
var ImageGrid       = require('./Visualizations/ImageGrid.jsx');
var ImageGridConfig = require('./Configs/ImageGridConfig.jsx');

var AddVisualizations = React.createClass({

  render: function(){
    return(
      <div>
        <Button>Add</Button>
      </div>
    )
  }
})


var VisualizationConfig = React.createClass({
  render: function(){
    var visualizationType = this.props.config.visualizationType;
    switch (visualizationType) {
      case "dataTable":
        return(
          <DataTableConfig attributes={this.props.attributes} handleVisualAttribute={this.props.handleVisualAttribute} />
        )
        break;
      case "imageGrid":
        return(
          <ImageGridConfig attributes={this.props.attributes} handleVisualAttribute={this.props.handleVisualAttribute} />
        )
      default:
        return(
          <div >Nothing </div>
        )

    }
  }
});

var ShowVisualizationConfig = React.createClass({
  getInitialState: function(){
    return{
      showDataSourceConfig: false
    }
  },
  showDataSourceConfig: function(){
    this.setState({showDataSourceConfig: true})
  },
  dontShowDataSourceConfig: function(){
    this.setState({showDataSourceConfig :false})
  },
  render: function(){
    var self = this;
    return(
      <div>
      <Button onClick={this.showDataSourceConfig}>Show Visualization.json</Button>
      <Modal show={self.state.showDataSourceConfig} onHide={this.dontShowDataSourceConfig}>
        <Modal.Header closeButton>
          <Modal.Title>dataSourceConfig.json</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Highlight className='javascript'>
              {JSON.stringify(self.props.config, null, 2)}
          </Highlight>

        </Modal.Body>
      </Modal>
      </div>
    )
  }
})

var Visualization = React.createClass({
  render: function(){
    console.log(this.props.config)
    var visualizationType = this.props.config.visualizationType;
    console
    switch(visualizationType){
      case "dataTable":
        return(
          <DataTable config={this.props.config} currData = {this.props.currData} />
        );
      case "imageGrid":
        return(
          <ImageGrid config={this.props.config} currData = {this.props.currData} />
        )
      default:
        break;
    }
  }
})

var SelectVisualization = React.createClass({
  getInitialState: function(){
    console.log(this.props.show)
    return{show: this.props.show}
  },
  addDataTable: function(){
    console.log(this);
    this.props.showHandler("dataTable", false);

  },
  componentWillReceiveProps: function(nextProps){
    console.log(nextProps)
    this.setState({show: nextProps.show})
  },
  addHeatMap: function(){


    //parent.addVisualization("heatMap");
    //this.setState({show: false, visualization:"heatMap"});
  },
  addImageGrid: function(){
    this.props.showHandler("imageGrid", false)
  },
  render: function(){
    console.log(this.props.parent)
    console.log(this.state.show)

    if(this.state.show ){
      return(
            <div id="selectVisualization">
              <div id="dataTable" onClick={this.addDataTable} >DataTable</div>
              <div id="heatMap" onClick={this.addHeatMap}>heatMap</div>
              <div id="imageGrid" onClick={this.addImageGrid}>imageGrid</div>
            </div>
      )
    } else {
      return (
        <div />
      )
    }

  }
})



var VisualizationsPanel = React.createClass({
    addVisualization: function(vis, showState){
      var visualization = {
        "visualizationType": vis
      }
      var config =this.state.config;
      console.log(vis)
      if(vis ==  "dataTable"){
        visualization.attributes = [];
        var attributes = this.state.attributes;
        for(var i in attributes){
          visualization.attributes.push({
            "attributeName": attributes[i].name
          });
        }
      } else if (vis == "imageGrid") {

          visualization.attributes = []
      }

      config.push(visualization);
      console.log(config)
      this.setState({config: config, showSelectVisualization: showState});
    },
    showHandler: function(state){
      this.setState({showSelectVisualization: state});
    },
    onAddVisualization: function(){
      console.log("addingVisualization")
      var visualization = {
        "visualizationType": "dataTable"
      }
      var config = this.state.config;
      config.push(visualization);
      this.setState({config: config});
    },
    getInitialState: function(){
      return{
        config:[],
        showSelectVisualization: true
      }
    },
    componentDidMount: function(){
      var attributes = 	AppStore.getData();
      console.log(attributes)
  		this.setState({attributes: attributes});
    },
    handleVisualAttribute: function(visualization, attribute ){
      var config = this.state.config;
      if(visualization == "dataTable"){
        for(var i in config){
          if(config[i].visualizationType == "dataTable"){
            for(var j in config[i].attributes){
              if(config[i]["attributes"][j].attributeName == attribute){
                //Remove this element from attributes array
                config[i]["attributes"].splice(j,1);
              }
            }
          }
        }
      } else if(visualization == "imageGrid"){
        for(var i in config){
          if(config[i].visualizationType == "imageGrid"){
            config[i]["attributes"] = [];
            config[i]["attributes"].push({
              "attributeName": attribute,
              "type": "image"
            })
          }
        }
      }
      this.setState({config: config})
    },
    render: function(){
      var self =this;
      console.log(this.state.config)
      if(this.state.attributes){
        var config = this.state.config;
        var count=0;
        var Visualizations = <div />
        if(this.state.config.length){
          Visualizations = this.state.config.map(function(visualization){
            count++;
            return(
              <TabPane tab={visualization.visualizationType} eventKey={count} >
                <div className="col-md-3">
                  <VisualizationConfig attributes={self.state.attributes} config={visualization} handleVisualAttribute={self.handleVisualAttribute}/>
                </div>
                <div className="col-md-9">
                  <Visualization config={visualization} />
                </div>
              </TabPane>
             )

          });

        }

    		Attributes = this.state.attributes.map(function(attribute){
    		//console.log(attribute)
    		return(
    		<div>
          <Attribute data={attribute}> </Attribute>
				</div>

    		);
    	})

    	} else {
    		Attributes = <div />
    	}

        return(
            <div>
                <h1>Visualizations</h1>
                <div>
                  <div>
                    <div onClick={self.showHandler}>
                    <AddVisualizations style={{"display": "inline-block"}}  />
                    <ShowVisualizationConfig config={self.state.config}/>
                    </div>
                    <SelectVisualization parent={self} show={self.state.showSelectVisualization} showHandler={self.addVisualization}/>
                  </div>
                  <div>
                    <TabbedArea>
                      {Visualizations}

                    </TabbedArea>
                  </div>

                </div>

            </div>
        );
    }
});


module.exports = VisualizationsPanel;
