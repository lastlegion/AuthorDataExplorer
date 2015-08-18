
var React = require('react');



var router = require('react-router');


var Router = router;
var DefaultRoute = router.DefaultRoute;
var Link = router.Link;
var Route = router.Route;
var RouteHandler = router.RouteHandler;


var DataSources = require('./DataSources.jsx')
var App = require('./Main.jsx');

var InteractiveFilters = require('./InteractiveFilters.jsx');
var VisualizationsPanel = require('./Visualization/VisualizationsPanel.jsx');
var Final = require('./Final.jsx');



var routes = (
  <Route handler={App} path="/">
    <Route name = "dataSources" handler={DataSources} path="/dataSources"/>
    <Route name = "interactiveFilters" handler={InteractiveFilters} path="/interactiveFilters"/>
    <Route name = "visualizations" handler={VisualizationsPanel} />
    <Route name = "finish" handler={Final} />

    <DefaultRoute handler={DataSources} />
  </Route>
);



Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});


// Or, if you'd like to use the HTML5 history API for cleaner URLs:

/*
React.render(
        <App />,
        document.getElementById("app")
);
*/
