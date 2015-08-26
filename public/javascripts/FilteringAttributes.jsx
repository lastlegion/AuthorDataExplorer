var React = require('react');

var Router = require('react-router');
var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;
var jQuery = require('jquery');

//React Bootstrap
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;

var ConfigActions = require('./actions/ConfigActions.jsx');
var DndStore      = require('./stores/DndStore.jsx');


var attributes = []

var dropTarget = {
  drop: function (props, monitor) {
    dropFilteringAttribute(monitor.getItem());

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

var dropped = [];
var config = []


var dc = require('dc');

var Input = require('react-bootstrap').Input,
    Well = require('react-bootstrap').Well;

var DeleteButton = React.createClass({

  deleteAttribute: function(){
    var attr = (this.props.data.data.allProps.data.name);
    this.props.hide()
    DndStore.onDeleteFilteringAttribute(this.props.data.data.allProps);
    for(var i in config){
      var elem = config[i].attributeName;
      if(elem == attr){
        config.splice(i,1);
      }
    }
    console.log(config)
  },
  render: function(){

    return(
      <div> <Button onClick={this.deleteAttribute}  bsStyle='danger'> Delete</Button> </div>
    )
  }
})

var Chart = React.createClass({
    getInitialState: function(){
      var self = this;
      var attributeName = this.props.name
      var chartData = self.props.data[attributeName];


      var dim = {
          filter: function(f) {

          },
          filterAll: function() {
          },
          name: function(){
                  return attributeName;
          }

      };
      var group = {
              all: function() {
                  //console.log(chartData.values)
                  return chartData.values;
              },
              order: function() {
                  return chartData;
                  //return groups[attributeName];
              },
              top: function() {
                  return chartData.values;
                  //return self.props.currData[attributeName].values;
              }

      };
      return {
        dim: dim,
        group: group

      }
    },
    componentDidMount: function(){



        var self = this;
        var attributeName = self.props.name;
        //console.log(self.props.data);
        //console.log(attributeName);
        //console.log(self.props.attributeName)
        //console.log(self.props.chartType)
        var chartData = self.props.data[attributeName];
        //console.log(chartData)

        var dim = this.state.dim;
        var group = this.state.group
        var dim = {
            filter: function(f) {

            },
            filterAll: function() {
            },
            name: function(){
                    return attributeName;
            }

        };
        var group = {
                all: function() {
                    //console.log(chartData.values)
                    return chartData.values;
                },
                order: function() {
                    return chartData;
                    //return groups[attributeName];
                },
                top: function() {
                    return chartData.values;
                    //return self.props.currData[attributeName].values;
                }

        };

        var self = this;
        var visType = this.props.chartType;
        var divId = "#"+self.props.name;
        var domain = [0,100]
        //var domain = this.props.config.domain || [0,100];
        var c = {};
        //Render according to chart-type
        switch(visType){
            case "pieChart":
                c   = dc.pieChart(divId);
                c.width(250)
                .height(190).dimension(dim)
                .group(group)
                .radius(90)
                .renderLabel(true);
                c.filterHandler(function(dimension, filters){
                  if(filters)
                    dimension.filter(filters);
                  else
                    dimension.filter(null);
                  return filters;
                });
                break;
            case "barChart":
                c = dc.barChart(divId);
                c.width(220)
                    .height(190).dimension(dim)
                    .group(group)
                    .x(d3.scale.linear().domain(domain))
                    .elasticY(true)
                    .elasticX(true)
                    .renderLabel(true)
                    .margins({left: 35, top: 10, bottom: 20, right: 10})
                    c.filterHandler(function(dimension, filter){

                        var begin = $("#filterBeg"+dimension.name());
                        var end = $("#filterEnd"+dimension.name());
                        if(filter.length > 0 && filter.length!=2){
                           filter = filter[0]
                        }
                        begin.val(filter[0]);
                        end.val(filter[1]);
                        dimension.filter(filter);
                        return filter;
                    });

                break;
            case "rowChart":
                c = dc.rowChart(divId);
                c.width(250)
                .height(190)
                .dimension(dim)
                .group(group)
                .renderLabel(true)
                .elasticX(true)
                .margins({top: 10, right: 20, bottom: 20, left: 20});
                c.filterHandler(function(dimension, filters){
                    if(filters)
                        dimension.filter(filters);
                    else
                        dimension.filter(null);
                    return filters;
                })
        }
        dc.renderAll();
        this.setState({chart: c, dim: dim, group: group});
    },

    componentDidUpdate: function(){
      //Render according to chart-type
      var visType = this.props.chartType;

      var divId = "#"+this.props.name;
      var dim = this.state.dim;
      var group = this.state.group;
      var domain = [0,100];
      //console.log(visType)
      switch(visType){
          case "pieChart":
              c   = dc.pieChart(divId);
              c.width(250)
              .height(190).dimension(dim)
              .group(group)
              .radius(90)
              .renderLabel(true);
              c.filterHandler(function(dimension, filters){
                if(filters)
                  dimension.filter(filters);
                else
                  dimension.filter(null);
                return filters;
              });
              break;
          case "barChart":
              c = dc.barChart(divId);
              c.width(220)
                  .height(190).dimension(dim)
                  .group(group)
                  .x(d3.scale.linear().domain(domain))
                  .elasticY(true)
                  .elasticX(true)
                  .renderLabel(true)
                  .margins({left: 35, top: 10, bottom: 20, right: 10})
                  c.filterHandler(function(dimension, filter){

                      var begin = $("#filterBeg"+dimension.name());
                      var end = $("#filterEnd"+dimension.name());
                      if(filter.length > 0 && filter.length!=2){
                         filter = filter[0]
                      }
                      begin.val(filter[0]);
                      end.val(filter[1]);
                      dimension.filter(filter);
                      return filter;
                  });

              break;
          case "rowChart":
              c = dc.rowChart(divId);
              c.width(250)
              .height(190)
              .dimension(dim)
              .group(group)
              .renderLabel(true)
              .elasticX(true)
              .margins({top: 10, right: 20, bottom: 20, left: 20});
              c.filterHandler(function(dimension, filters){
                  if(filters)
                      dimension.filter(filters);
                  else
                      dimension.filter(null);
                  return filters;
              })
      }
      dc.renderAll();
    },
    render: function(){
        var self = this;
        //console.log(self)
        if(self.props.chartVisible){
            return(
                <div style={{height: 270,  clear: "both", display: "block"}} id={self.props.name} className="col-xs-12" >
                  Yo
                </div>
            );
        } else {
            return(
                <div id={self.props.name} ></div>
            );
        }
    }
})


var DivI = React.createClass({
  getInitialState: function(){
    return {chartData: {}, isFilteringAttribute: false, show: true}
  },
  hide: function(){
    this.setState({show: false})
  },
  componentDidMount: function(){
    var self  =this;
    var name = self.props.data.allProps.data.name;
    //console.log(name);
    $.get("/addFilteringAttribute?attribute="+encodeURIComponent(name), function(data){
        //we should get information required for rendering charts here.
        //console.log(data);
        self.setState({isFilteringAttribute: true, chartData: data});

    })
  },
  selectChartType: function(e){
    var properties = this.props.data.allProps.data;
    for(var i in config){
      var attr = config.attributeName;
      //console.log(properties.name)
      if(properties.name == config[i].attributeName){
        config[i].visualization.visType = e.target.value
      }
    }
    this.setState({chartType: e.target.value})
  },
  componentWillMount: function(){
    var properties = this.props.data.allProps.data;
    var self = this;
    chartTypes = [];

    if(properties.type == "integer"){
      chartTypes.push("barChart");
      chartType = "barChart";
    } else if(properties.type == "string"){
      chartTypes.push("pieChart");
      chartTypes.push("rowChart");
      chartType = "pieChart"
    }
    this.setState({chartTypes: chartTypes, chartType: chartType})
    for(var i in config){
      var attr = config.attributeName;
      if(properties.name == config[i].attributeName){
        config[i].visualization.visType = chartType
      }
    }
  },
  render: function(){
    var properties = this.props.data.allProps.data;
    var self = this;
    var show = this.state.show;
    //console.log(self.state.chartData);

    var chartTypes = this.state.chartTypes;
    var ChartTypeOptions = chartTypes.map(function(type){
      return(
        <option value={type}>{type}</option>
      );
    })
    if(!show){
      return (
        <div></div>
      )
    }

    return(
      <div className="col-md-6">

      <Panel collapsible defaultExpanded  header={properties.name} >
        {
          self.state.isFilteringAttribute ?
          <div >
            <DeleteButton data={self.props} hide={self.hide}/>
            <div className="row">
            <Chart data={self.state.chartData} name={properties.name} chartType={self.state.chartType}/>
            </div>
            <div className="row">
            <Input type="select" label='ChartType' onChange={this.selectChartType} value={self.state.ChartType}>
              {ChartTypeOptions}
            </Input>
            </div>
          </div>
          :
          <div />
        }
        <Table condensed bordered>
            <tbody>
              <tr>
                <td>Visualization</td>
                <td>

                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td><div className="attributeProperyVal"> {properties.type}</div></td>
              </tr>
              <tr>
                <td>Unique</td>
                <td><div className="attributeProperyVal" >{properties.distinct}</div></td>
              </tr>
          {

            properties.type == "number" || properties.type =="integer"
            ?
            <div>
              <tr>
                <td>Mean</td>
                <td>{Math.round(properties.mean*10)/10}</td>
              </tr>
              <tr>
                <td>Max</td>
                <td><div className="attributeProperyVal">{Math.round(properties.max*10)/10}</div></td>
              </tr>
                </div>
                :

            <div />
          }

            </tbody>
          </Table>


      </Panel>
    </div>

    )
  }
});

var DroppedElements = React.createClass({
  render: function(){
    var Attribute = dropped.map(function(prop){
      return(
        <DivI data={prop} />
      )
    });
    return(
      <div id="fileteringAttributesDrop">
             {Attribute}
      </div>

    )
  }
});

function dropFilteringAttribute(props){
  var attributeName = props.allProps.data.name;
  config.push({
    "attributeName": attributeName,
    "visualization": {

    }
  });
  dropped.push(props);
  React.render(<DroppedElements />, document.getElementById("filteringAttributes"))
}

var ShowInteractiveFiltersConfig = React.createClass({
  render: function(){
    return

  }
})

var FilteringAttributes = React.createClass({
  mixins: [Router.Navigation],
  handleVisualization: function(){
    var self =this;
    ConfigActions.interactiveFilters(config);
    self.transitionTo('visualizations')

  },
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  },
	render: function(){
    	var connectDropTarget = this.props.connectDropTarget;
    	var isOver = this.props.isOver;
    	var canDrop = this.props.canDrop;


		var style = {
			minHeight: 500,
			background: "white",
      border: "3px solid #fff"
		};
		if(canDrop){
			style.border = "3px dashed #ccc";
		}
		return connectDropTarget(
      <div className="col-md-8" style={{minHeight: 500}}>
        <div className='row'>
          <div className='col-md-8'>
            <h1>Filtering Attributes</h1>
          </div>
          <div className='col-md-4' style={{padding:10, float: "right"}}>
            <Button onClick={this.handleVisualization}>Visualizations</Button>
          </div>
        </div>
        <div style={style} id="filteringAttributes"> Drop attributes here </div>
      </div>


		);
	}
});
module.exports = DropTarget(ItemTypes.ATTRIBUTE, dropTarget, collect)(FilteringAttributes);
