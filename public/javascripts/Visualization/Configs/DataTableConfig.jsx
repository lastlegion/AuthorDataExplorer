var React       = require('react');

var Input       = require('react-bootstrap').Input;

var DataTableConfig = React.createClass({
  getInitialState: function(){
    var attributes = this.props.attributes;
    var visualAttributes = {}
    for(var i in attributes){
      visualAttributes[attributes[i]["name"]] = true
    }
    return(
      {
        visualAttributes: visualAttributes
      }
    )
  },
  handleAttribute: function(event){
    var attribute = event.target.value;
    var isChecked = this.state.visualAttributes[attribute];
    var visualAttributes = this.state.visualAttributes;
    visualAttributes[attribute] = false;

    this.setState({visualAttributes: visualAttributes});
    this.props.handleVisualAttribute("dataTable", attribute)
  },
  render: function(){
    var self = this;
    var config = this.props.config;
    var attributes = this.props.attributes;
    //console.log(this)
    var DataTableAttributes = attributes.map(function(attribute){
      //console.log(attribute)
      //console.log(self.state.visualAttributes)
      //console.log(self.state.visualAttributes[attribute.name])
      return(
        <Input type='checkbox' label={attribute.name} onChange={self.handleAttribute} value={attribute.name} checked={self.state.visualAttributes[attribute.name]}/>
      )
    })
    return(
      <div>
        {DataTableAttributes}
      </div>
    )

  }
});

module.exports = DataTableConfig;
