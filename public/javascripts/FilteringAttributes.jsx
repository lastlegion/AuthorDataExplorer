var React = require('react');


var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;



var dropTarget = {
  drop: function (props) {
  	console.log(props);
    console.log("dropped...!!!")
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


var FilteringAttributes = React.createClass({
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

    	console.log(canDrop)
		
		var style = {
			minHeight: 400,
			background: "white",
			padding: 8
		};
		if(canDrop){
			style.background = "darkkhaki";
		}
		return connectDropTarget(
			<div className="col-md-7" style={style}> Filtering Attributes </div>
		

		);
	}
});
module.exports = DropTarget(ItemTypes.ATTRIBUTE, dropTarget, collect)(FilteringAttributes);