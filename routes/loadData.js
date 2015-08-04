var express = require('express');
var router = express.Router();
var fs = require('fs');

var dl = require('datalib');

var dataSource = require("../modules/dataSource"),
    interactiveFilters = require("../modules/interactiveFilters");

router.get('/', function (req, res, next) {
    console.log(req.param('dataSourceConfig'));
    var dataSourceConfig = JSON.parse(req.param("dataSourceConfig"));
    console.log(dataSourceConfig)
    console.log(dataSource.init(dataSourceConfig));

    dataSource.loadData(function(data){
        console.log(data)
        

        var attributes = [];
        var dldata = dl.read(data, {type: 'json', parse: 'auto'})
        var types = dl.type.inferAll(dldata);
        //var maxs = dl.max
        var summary  = dl.summary(data);
        var x = summary.map(function(attribute){

            var stats = {
                name: attribute.field,
                type: types[attribute.field],
                max: attribute.max,
                min: attribute.min,
                mean: attribute.mean,
                stdev: attribute.stdev,
                distinct: attribute.distinct
            }
            attributes.push(stats);
        })
        /*
        for(var key in data[0]){
            var attribute = {};
            attribute.name = key;
            attribute.type = types[key];
            console.log(attribute)
            attributes.push(attribute)
        }
        */

        //Apply crossfilter on whole data
        interactiveFilters.applyCrossfilter(data);
        
        //console.log(attributes)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(attributes));



    })
});

module.exports = router;
