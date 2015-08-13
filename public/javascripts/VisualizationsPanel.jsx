
var React     = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;
var AppStore  = require('./stores/AppStore.jsx');
var jQuery    = require('jquery');
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;



var DataTable = React.createClass({
    getInitialState: function(){
      return({
        "attributes": [
        {"attributeName": "CancerType"},
        {"attributeName": "BCRPatientUIDFromClinical"},{"attributeName": "BCRSlideUID"},{"attributeName": "BCRPatientUIDFromPathology"}
        ]
      })
    },
    componentDidMount: function(){


        var self = this;
        console.log(self.state.attributes)


            var columns = [];
            var count=0;
            for(var i in self.state.attributes){
                columns[count] = {};
                //columns[count]["data"] = self.props.config.attributes[i].name;
                columns[count]["title"] = self.state.attributes[i].label || self.state.attributes[i].attributeName;
                columns[count]["bSearchable"]= false;
                columns[count]["bSortable"] =false ;
                count++;
            }
            dataTable = $('#vis').DataTable({
                bSort: false,
                bFilter: false,
                aoColumns: columns,

                "ajax": "dataTable/next",
                "processing": true,
                "serverSide": true,
                "scrollY": 420,
                "scrollX": true,
                 "pageLength": 100,
                columns: columns

            });


    },
    componentWillReceiveProps: function(){
        if(dataTable.ajax){
            dataTable.ajax.reload(); //jquery datatable fix
        }
    },
    render: function(){
        console.log("rendering table. ...")
        var tableAttribtes = [];


            return(
                <table id="vis" className="display">

                </table>
            );
    }
});


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

var AddVisualizations = React.createClass({
  render: function(){
    return(
      <div>
        <Button>Add</Button>
      </div>
    )
  }
})

var Visualizations = React.createClass({
  render: function(){
    return (
      <div>
        <DataTable />

      </div>

    )
  }
})

var VisualizationsPanel = React.createClass({

    addVisualization: function(){

    },
    getInitialState: function(){
      return{
        attributes: []
      }
    },
    componentDidMount: function(){
      var attributes = 	AppStore.getData();
      //console.log(attributes)
  		this.setState({attributes: attributes});
    },
    render: function(){
      if(this.state.attributes){

    		Attributes = this.state.attributes.map(function(attribute){
    		//console.log(attribute)
    		return(
    		<div>
          <Attribute data={attribute}> </Attribute>
				</div>

    		);
    	})

    	} else {
    		Attributes = <div />
    	}

        return(
            <div>
                <h1>Visualizations</h1>
                <div>
                  <div>
                    <AddVisualizations style={{"display": "inline-block"}}>
                      <Glyphicon glyph='glyphicon glyphicon-plus' style={{height:80}} onClick={this.addVisualization} />
                    </AddVisualizations>

                  </div>

                  <div className="col-md-3">
                    {Attributes}
                  </div>
                  <div className="col-md-9">
                    <Visualizations />
                  </div>
                </div>

            </div>
        );
    }
});


module.exports = VisualizationsPanel;
