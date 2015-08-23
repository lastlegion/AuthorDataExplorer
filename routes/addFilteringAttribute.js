var express = require('express');
var router = express.Router();
var fs = require('fs')
var dataSource = require("../modules/dataSource"),
    interactiveFilters = require("../modules/interactiveFilters");

router.get('/', function (req, res, next) {
    var results = {};
    var attribute = req.param('attribute');
    var ndx = interactiveFilters.getndx();
    var dimension = ndx.dimension(function(d){
        //console.log(d)
        return d[attribute];
    })
    var group = dimension.group();
    interactiveFilters.addDimension(attribute, dimension);
    interactiveFilters.addGroup(attribute, group)


    results[attribute] = {values:group.all()};
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end((JSON.stringify(results)))
});

module.exports = router;
