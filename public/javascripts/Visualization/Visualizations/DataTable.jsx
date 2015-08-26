var React       = require('react');

var DataTable = React.createClass({
    hideColumn: function(key){
      var attributes = this.props.config.attributes;
      var i=0;
      attributes.map(function(attribute){
        column = dataTable.column(i);
        if(i == key)
          column.visible(false)
        i++;
      })
    },
    componentDidUpdate: function(){

      this.hideColumn(2)
      //var dataTable = this.state.dataTable;
      var attributes = this.props.config.attributes;
      var columns = [];
      //dataTable.columns().visible(false)
      var i=0;
      /*
      attributes.map(function(attribute){
        column = dataTable.column(i);
        console.log(column)
        column.visible(true)
        i++
      })
      */
      //dataTable.fnSetColumnVis(1, false)
      var columns = dataTable.columns();

      console.log(columns)

    },
    componentDidMount: function(){


        var self = this;
        console.log(self.props.config.attributes)


            var columns = [];
            var count=0;
            for(var i in self.props.config.attributes){
                columns[count] = {};
                columns[count]["data"] = self.props.config.attributes[i].name;
                columns[count]["title"] = self.props.config.attributes[i].label || self.props.config.attributes[i].attributeName;
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
            this.setState({dataTable: dataTable})

    },
    componentWillReceiveProps: function(){
        if(dataTable){
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

module.exports = DataTable;
