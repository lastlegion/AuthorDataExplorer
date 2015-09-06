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
		var self = this;
		setTimeout(function(){
			var attributes = 	AppStore.getData();
			console.log(attributes)
			self.setState({attributes: attributes});

		}, 200)


	},
    render: function(){
    	if(this.state.attributes){
				console.log(this.state.attributes)

    		Attributes = this.state.attributes.map(function(attribute){

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
							<h1>Interactive Filters</h1>
                <div id="interactiveFiltersAttributes" className="col-md-3" >
                {Attributes}
								</div>

                <FilteringAttributes />

            </div>
        );
    }
});


module.exports = DragDropContext(HTML5Backend)(InteractiveFilters);
