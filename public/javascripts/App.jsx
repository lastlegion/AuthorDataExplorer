var react = require("react");

var App = React.createClass({
    render: function(){
        return(
            <div>Test</div>
        );
    };
}); 

React.render(
        App,
        document.getElementById("app")
);
