var express = require('express');
var router = express.Router();
var fs = require('fs');

var dl = require('datalib');

var dataSource = require("../modules/dataSource"),
    interactiveFilters = require("../modules/interactiveFilters");

var DATA;
var _loadData =  function (req, res, next) {
    console.log(req.param('dataSourceConfig'));
    var dataSourceConfig = JSON.parse(req.param("dataSourceConfig"));
    console.log(dataSourceConfig)
    console.log(dataSource.init(dataSourceConfig));

    dataSource.loadData(function(data){
        console.log(data)
        DATA = data;

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
};


var _tableNext = function(req, res, next){


    state = req.param("state") ? JSON.parse(req.param("state")) : 1,
    results = {};
    TABLE_DATA = DATA;

    console.log(TABLE_DATA)


  var len = TABLE_DATA.length;
  //var reqParams = iDisplayLength, iDisplayStart
  var start = req.query.start || 0;
  var length = req.query.length || 100;
  console.log(start )
  console.log(start.length)
  var TABLE_DATA = TABLE_DATA.slice(start, start+length)
  console.log(TABLE_DATA)
  var DATA_ARRAY = [];
  for(var i in TABLE_DATA){
    //var row = Object.keys(TABLE_DATA[i]).map(function(k) { return TABLE_DATA[i][k] });
    /*
    var row = [];
    for(var j in TABLE_DATA){
      var attrName = dataTableAttributes[j]["attributeName"];
      row.push(TABLE_DATA[i][attrName]);
    }
    */
    var row = []
    console.log(TABLE_DATA[i])

    for(var j in TABLE_DATA[i]){
      //console.log(j)
      console.log(TABLE_DATA[i][j])
      row.push(TABLE_DATA[i][j])
    }

    DATA_ARRAY.push(row);
  }

  results = {
    data: DATA_ARRAY,
    active: 0,
    state: state,
    draw: req.query.draw,
    recordsTotal: dataSource.getTotalRecords(),      //FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!
    recordsFiltered: len
  }
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(JSON.stringify(results));
};

exports.index =  _loadData;
exports.tableNext = _tableNext
