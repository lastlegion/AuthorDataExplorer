var React       = require('react');


var Attribute = React.createClass({

	getInitialState: function(){
		return {open: true, dropped: false}
	},
	onClick: function(){
		//this.setState({open: !this.state.open})
	},
  componentDidMount: function(){

  },
  onDrop: function(){

  },
	render: function(){

		var self = this;
      return (
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

module.exports = Attribute;
