
var React     = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;
var Visualizations = React.createClass({

    addVisualization: function(){

    },
    render: function(){
        return(
            <div>
                <h1>Visualizations</h1>
                <div>
                  <div>
                    <Glyphicon glyph='glyphicon glyphicon-plus' style={{height:80}} onClick={this.addVisualization} />
                  </div>
                  Add visualizations here
                </div>

            </div>
        );
    }
});


module.exports = Visualizations;
