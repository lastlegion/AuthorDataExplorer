var React = require('react');
var dc = require('dc');

var Input = require('react-bootstrap').Input,
    Well = require('react-bootstrap').Well;

var Chart = React.createClass({

    componentDidMount: function(){



        var self = this;
        var attributeName = self.props.name;
        console.log(self.props.data);
        console.log(attributeName);
        console.log(self.props.attributeName)
        var chartData = self.props.data[attributeName];
        console.log(chartData)


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
                    console.log(chartData.values)
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
        var visType = "barChart";
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
        this.setState({chart: c});
    },    

    componentWillMount: function(){

    },
    render: function(){
        var self = this;
        console.log(self)
        if(self.props.chartVisible){
            return(
                <div style={{height: 270,  clear: "both", display: "block"}} id={self.props.name} className="col-xs-12" />
            );
        } else {
            return(
                <div></div>
            );
        }
    }
})

module.exports = Chart;