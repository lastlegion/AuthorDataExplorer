var jQuery = require('jquery');
var React = require('react');
var request = require('superagent');
var bootstrap = require('bootstrap');
var Button = require('react-bootstrap').Button,
	Panel = require('react-bootstrap').Alert,
	Modal = require('react-bootstrap').Modal,
	Input = require('react-bootstrap').Input;
    Glyphicon = require('react-bootstrap').Glyphicon;
var Dropzone = require('react-dropzone');

var DataSourcesPanel = require('./components/DataSourcesPanel.jsx')



    var App = React.createClass({
        render: function(){
            return(
                <div className="row">
                    <DataSourcesPanel />
                </div>
            );
        }
    }); 

    React.render(
            <App />,
            document.getElementById("app")
    );
