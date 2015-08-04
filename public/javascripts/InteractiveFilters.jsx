var React = require('react');
var jQuery = require('jquery');


var AppStore = require('./stores/AppStore.jsx');
var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;
var DragDropContext = require('react-dnd').DragDropContext;

var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;

var HTML5Backend = require('react-dnd/modules/backends/HTML5');

var Attribute = require('./Attribute.jsx');
var FilteringAttributes = require('./FilteringAttributes.jsx');


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

                <FilteringAttributes />

            </div>
        );
    }
});


module.exports = DragDropContext(HTML5Backend)(InteractiveFilters);