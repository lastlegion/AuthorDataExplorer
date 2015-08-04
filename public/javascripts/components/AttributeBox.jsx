var React = require('react');
var jQuery = require('jquery');
var request = require('superagent');

/*Bootstrap stuff*/
var bootstrap = require('bootstrap');
var Button = require('react-bootstrap').Buttone,
    Collapse = require('react-bootstrap').Collapse,
    Input = require('react-bootstrap').Input,
    Glyphicon = require('react-bootstrap').Glyphicon;


var Chart = require('./Chart.jsx');

var AttributeBox = React.createClass({
    getInitialState: function(){
        return({isFilteringAttribute: false, isVisualAttribute: false, chartData: {}, attributeOptions: false});
    },
    handleFilteringAttribute: function(){
        
        var self = this;
        var isFilteringAttribute = self.isFilteringAttribute;

        if(isFilteringAttribute){
            self.setState({isFilteringAttribute: false});
        } else {

            $.get("/addFilteringAttribute?attribute="+encodeURIComponent(self.props.name), function(data){
                //we should get information required for rendering charts here.
                console.log(data);
                self.setState({isFilteringAttribute: true, chartData: data});

            })
            //console.log("well add it to the dimensions list")
        }
        
    },
    handleAttributeOptions: function(){
        var attributeOptions = this.state.attributeOptions;

        this.setState({attributeOptions: !attributeOptions})
    },
    render: function(){
        var self = this;
        var attribute = this.props.name;
        return (
            <div bsSize='small' className="attribute">
                <div className="attributeHeader">
                    
                    <div className="attributeName">{attribute.name}</div> 
                    <div className="attributeCollapse" onClick={this.handleAttributeOptions}>

                    {self.state.attributeOptions ?
                        <Glyphicon glyph="glyphicon glyphicon-menu-up" />
                    :
                        <Glyphicon glyph="glyphicon glyphicon-menu-down" />
                    }
                    </div>
                </div>
                <Collapse in={this.state.attributeOptions}>
                    <div class="attributeProperties" style={{clear: "both"}}>
                        <Input type='checkbox' label='FilteringAttribute' value = {self.state.isFilteringAttribute} onChange={this.handleFilteringAttribute}/>
                        
                        {self.state.isFilteringAttribute ?
                            <Chart chartVisible={this.state.isFilteringAttribute} data={this.state.chartData} name={attribute} />
                        :
                            <div />
                        }
                        <div style={{display: "block"}}>
                        <Input type='checkbox' label='VisualAttribute' />
                       
                        Summary Statistics <br />
                            <ul>
                                <li>Mean: </li>
                                <li>Type: </li>
                            </ul>
                        </div>
                    </div>
                </Collapse>

            </div>
        );      
    }

});

module.exports = AttributeBox;