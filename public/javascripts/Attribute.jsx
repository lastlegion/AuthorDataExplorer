var React = require('react');
var jQuery = require('jquery');

var AppActions = require('./actions/AppActions.jsx')
var DndStore = require('./stores/DndStore.jsx');
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
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop(),
    item: monitor.getItem()
  }
}

var attributeSource = {
  beginDrag: function (props) {
    return {
		allProps: props
    };
  },
  endDrag: function(props, monitor, component){
    //console.log("End drag")
    if(monitor.didDrop()){
      AppActions.dropFilteringAttribute(props);

      //console.log(component)
    }

  	//this.setState({filteringAttribute: true})
  }

}

var Attribute = React.createClass({
	propTypes: {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
    didDrop: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {open: true, dropped: false}
	},
	onClick: function(){
		this.setState({open: !this.state.open})
	},
  componentDidMount: function(){
    var self = this;
    self.unsubscribe = DndStore.listen(self.onDrop);
    var isDropped = DndStore.isDropped(this.props);
    if(isDropped){

    } else {
      this.setState({dropped: false});
    }
  },
  onDrop: function(){
    var didDrop = this.props.didDrop;
    var isDropped = DndStore.isDropped(this.props);
    console.log(isDropped)
    if(isDropped){
      console.log("DROPPED")
      this.setState( {dropped: true});
    } else {
      this.setState({dropped: false})
    }
  },
	render: function(){
	    var connectDragSource = this.props.connectDragSource;
    	var isDragging = this.props.isDragging;
      var isDropped = DndStore.isDropped(this.props);
      var didDrop = this.props.didDrop;
      //console.log(didDrop)

		var self = this;

		//console.log(self.props.data);
    //if(didDrop == true && (this.props.item.allProps.data.name == this.props.data.name)){
    if(self.state.dropped == true){
        //this.setState({dropped: true})
        //console.log(this.props.item.allProps.data.name)
        return (<div />)
    } else {
      return connectDragSource(
        <div className="col-md-12">
        <Panel collapsible defaultCollapsed   header={self.props.data.name} style={{margin: 2}}>
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

	}
});

module.exports = DragSource(ItemTypes.ATTRIBUTE, attributeSource, collect)(Attribute);
