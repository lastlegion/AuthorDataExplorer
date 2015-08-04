var React = require('react');
var jQuery = require('jquery');


var AppStore = require('./stores/AppStore.jsx');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;

var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;
var Attribute = React.createClass({
	getInitialState: function(){
		return {open: true}
	},
	onClick: function(){
		this.setState({open: !this.state.open})
	},
	render: function(){
		var self = this;

		console.log(self.props.data);
		return (
			<div className="col-md-12">
			<Panel collapsible defaultExpanded  header={self.props.data.name} style={{margin: 2}}>
				<Table condensed bordered>
				    <tbody>
				      <tr>
				        <td>Type</td>
				        <td><div className="attributeProperyVal"> {self.props.data.type}</div></td>
				      </tr>
				      <tr>
				        <td>Unique</td>
				        <td><div className="attributeProperyVal" >{self.props.data.distinct}</div></td>
				      </tr>
					{

						self.props.data.type == "number" || self.props.data.type =="integer"
						?
						<div>
				      <tr>
				        <td>Mean</td>
				        <td>{Math.round(self.props.data.mean*10)/10}</td>
				      </tr>
				      <tr>
				        <td>Max</td>
				        <td><div className="attributeProperyVal">{Math.round(self.props.data.max*10)/10}</div></td>
				      </tr>
				      	</div>
				      	:

						<div />
					}

				    </tbody>
				  </Table>


			</Panel>
			</div>
		);
	}
});


var InteractiveFilters = React.createClass({
	getInitialState: function(){
		return{attributes: []}
	},

	componentDidMount: function(){
		
		var attributes = 	AppStore.getData();
		this.setState({attributes: attributes});


	},
    render: function(){
    	if(this.state.attributes){

    		Attributes = this.state.attributes.map(function(attribute){
    		console.log(attribute)
    		return(
    		<PanelGroup>
    			<Attribute data={attribute}> </Attribute>
			</PanelGroup>

    		);
    	})

    	} else {
    		Attributes = <div />
    	}
        return(
            <div>
                <div id="interactiveFiltersAttributes" className="col-md-5">
                {Attributes}
                </div>

                <div className ="col-md-7">
                	Filters
                </div>

            </div>
        );
    }
});

module.exports = InteractiveFilters;