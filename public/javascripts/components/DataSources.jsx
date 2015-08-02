var React = require('react');

var DataSources = React.createClass({

    render: function(){
        var self = this;
        var Sources = self.props.dataSources.map(function(dataSource){
            return(

                <div  className="col-md-3 dataSourceSnap"> 
                    sourceName: {dataSource.name}

                </div>
            );
        })
        return(
            <div className="row">{Sources}</div>
        );
    }
});

module.exports = DataSources;