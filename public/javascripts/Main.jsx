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

              <div className="col-md-12">


                  <div className="row">
                      <RouteHandler />
                  </div>
              </div>
            </div>
        );
    }
});


module.exports = Main;
