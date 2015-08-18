var Reflux = require('reflux');


var Actions = Reflux.createActions([
    'dataSource',
    'interactiveFilters',
    'visualizations'
]);

module.exports =  Actions;
