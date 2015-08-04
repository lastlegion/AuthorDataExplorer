var React = require('react');
var jQuery = require('jquery');


var AppStore = require('./stores/AppStore.jsx');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;

var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;

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
			<PanelGroup>
			<Panel collapsible defaultExpanded  header={self.props.data.name} style={{margin: 2}}>

				<div className='attributeType' style={{display: "block", height: 30	}}>
					{self.props.data.type}
				</div>
				<div className='attributeMean' style={{display: "block"}}>
					{Math.round(self.props.data.mean*10)/10}
				</div>
			</Panel>
			</PanelGroup>
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
    			<Attribute data={attribute}> </Attribute>
    		);
    	})

    	} else {
    		Attributes = <div />
    	}
        return(
            <div>
                <div id="interactiveFiltersAttributes" className="col-md-4">
                {Attributes}
                </div>

                <div className ="col-md-8">
                	Filters
                </div>

            </div>
        );
    }
});

module.exports = InteractiveFilters;