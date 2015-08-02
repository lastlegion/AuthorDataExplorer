var React = require('react');
var jQuery = require('jquery');


var AppStore = require('./stores/AppStore.jsx');

var InteractiveFilters = React.createClass({
	getInitialState: function(){
		return{attributes: []}
	},

	componentDidMount: function(){
		console.log(AppStore.getData());
		var attributes = 	AppStore.getData()["attributes"];
		this.setState({attributes: attributes});


	},
    render: function(){
    	if(this.state.attributes){

    		Attributes = this.state.attributes.map(function(attribute){
    		return(
    			<div className="attribute">
    				{attribute}
    			</div> 
    		);
    	})

    	} else {
    		Attributes = <div />
    	}
        return(
            <div>
                {Attributes}
            </div>
        );
    }
});

module.exports = InteractiveFilters;