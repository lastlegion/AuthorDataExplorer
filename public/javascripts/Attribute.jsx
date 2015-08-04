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

var DragSource = require('react-dnd').DragSource;


var ItemTypes = require('./Constants.js').ItemTypes;

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var attributeSource = {
  beginDrag: function (props) {
    return {
		allProps: props    	
    };
  },
  endDrag: function(){
  	this.setState({filteringAttribute: true})
  }

}

var Attribute = React.createClass({
	propTypes: {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired
	},
	getInitialState: function(){
		return {open: true}
	},
	onClick: function(){
		this.setState({open: !this.state.open})
	},
	render: function(){
	    var connectDragSource = this.props.connectDragSource;
    	var isDragging = this.props.isDragging;
	
		var self = this;

		console.log(self.props.data);
		return connectDragSource(
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

module.exports = DragSource(ItemTypes.ATTRIBUTE, attributeSource, collect)(Attribute);
