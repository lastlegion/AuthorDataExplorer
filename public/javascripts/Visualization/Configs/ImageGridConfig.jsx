var React = require('react');
var Input = require('react-bootstrap').Input;
var ImageGridConfig = React.createClass({
  getInitialState: function(){
    return(
      {imageAttribute: ""}
    )
  },
  onSelectAttribute: function(e){
    var imageAttribute = e.target.value;
    this.setState({imageAttribute: imageAttribute});
    
    this.props.handleVisualAttribute("imageGrid", imageAttribute)

  },
  render: function(){
    //console.log(this.props.attributes)
    var self = this;
      var Options = this.props.attributes.map(function(attribute){
        //console.log(attribute.name)
        return(
          <option value={attribute.name}>{attribute.name}</option>
        )
      })
      return(
        <Input type="select" value={self.state.imageAttribute} label="ImageAttribute" onChange={self.onSelectAttribute}>
          {Options}
        </Input>
      )
  }
})

module.exports = ImageGridConfig;
