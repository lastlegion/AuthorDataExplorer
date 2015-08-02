var React = require('react');
var DataSourcesPanel = require('./components/DataSourcesPanel.jsx');
var DataSources = React.createClass({

    render: function(){
        console.log("rendering....")
        return(
            <DataSourcesPanel />
        );
    }
});

module.exports = DataSources;