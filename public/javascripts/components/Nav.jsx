var React = require('react');


var Nav = React.createClass({

    render: function(){
        return(

            <div className='navbar navbar-inverse navbar-fixed-top' id='header' role='navigation'>
                <div className = 'container-fluid'>
                    <div className='navbar-header'>
                        <a className='navbar-brand' href='#'> Author Data Explorer </a>
                    </div>
                </div>
            </div>


        );


    }
});

module.exports = Nav;
