
var React = require("react");
var AttributeBox = require('./AttributeBox.jsx');

var Attributes = React.createClass({
    render: function(){
        var self = this;
        var Attribute = <div />
        if(self.props.attributes ){

            Attribute = self.props.attributes.map(function(attribute){
                console.log(attribute)
                return (

                    <AttributeBox name={attribute} />
                );
            });
        }
        return(
            <div>
            {Attribute}
            </div>
        )
    }
});


module.exports = Attributes;
