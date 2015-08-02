var React = require('react');

var router = require('react-router');

var Nav = require('./components/Nav.jsx');

var Router = router;
var DefaultRoute = router.DefaultRoute;
var Link = router.Link;
var Route = router.Route;
var RouteHandler = router.RouteHandler;

var Main = React.createClass({
    render: function(){
        console.log("rendering....")
        return(
            <div>

                <Nav />

            <div className="col-md-8 col-md-offset-2">

            
                <div className="row">
                    <ul id="wizardNav"> 
                        <li><Link to="dataSources">Data Sources</Link></li>
                        <li><Link to="interactiveFilters">Interactive Filters</Link></li>
                        <li><Link to="visualizations">Visualizations</Link></li>
                    </ul>
                </div>
                <div className="row">
                    <RouteHandler />
                </div>
            </div>
            </div>
        );
    }
});     


module.exports = Main;