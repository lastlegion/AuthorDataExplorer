var express = require('express');
var router = express.Router();
var fs = require('fs')
var dataSource = require("../modules/dataSource"),
    interactiveFilters = require("../modules/interactiveFilters");

router.get('/', function (req, res, next) {
    var results = {};
    var attribute = req.param('attribute');
    console.log(req.param('attribute'));
    var ndx = interactiveFilters.getndx();
    var dimension = ndx.dimension(function(d){
        //console.log(d)
        return d[attribute];
    })
    console.log(".................")
    var group = dimension.group();
    interactiveFilters.addDimension(attribute, dimension);
    interactiveFilters.addGroup(attribute, group)

    console.log(".................")
    console.log(group.all())
    console.log(group.top(1)[0].values)
    results[attribute] = {values:group.all()};
    console.log(JSON.stringify(results))
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end((JSON.stringify(results)))
});

module.exports = router;
