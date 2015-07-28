var express = require('express');
var router = express.Router();
var fs = require('fs')
var dataSource = require("../modules/dataSource"),
    interactiveFilters = require("../modules/interactiveFilters");

router.get('/', function (req, res, next) {
    console.log(req.param('dataSourceConfig'));
    var dataSourceConfig = JSON.parse(req.param("dataSourceConfig"));
    console.log(dataSourceConfig)
    console.log(dataSource.init(dataSourceConfig));

    dataSource.loadData(function(data){
        console.log("....")
        //  console.log(data);


        var attributes = [];
        for(var key in data[0]){
            attributes.push(key)
        }

        //Apply crossfilter on whole data
        interactiveFilters.applyCrossfilter(data);
        

        console.log(attributes)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({attributes: attributes}));



    })
});

module.exports = router;
