var React = require('react');


var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;

//React Bootstrap
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;



var dropTarget = {
  drop: function (props, monitor) {
  	console.log(props);
    console.log(monitor.getItem())
    console.log("dropped...!!!")
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



function dropFilteringAttribute(props){
  var DivI = React.createClass({
    render: function(){
      console.log(props);
      var properties = props.allProps.data;
      return(
        <Panel collapsible defaultExpanded  header={properties.name}>
  				<Table condensed bordered>
  				    <tbody>
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

      )
    }
  })
  React.render(<DivI />, document.getElementById("filteringAttributes"))
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
      <div className="col-md-8">
        <h1>Filtering Attributes</h1>
        <div className="col-md-7" style={style} id="filteringAttributes"> Filtering Attributes </div>
      </div>


		);
	}
});
module.exports = DropTarget(ItemTypes.ATTRIBUTE, dropTarget, collect)(FilteringAttributes);
