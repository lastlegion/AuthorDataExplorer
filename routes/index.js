var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var _tableNext = function(req, res, next){
  var dimensions = interactiveFilters.getDimensions(),
    groups = interactiveFilters.getGroups(),
    filteringAttributes = dataDescription.getFilteringAttributes(),
    state = req.param("state") ? JSON.parse(req.param("state")) : 1,
    results = {};
    TABLE_DATA = dimensions[filteringAttributes[0]["attributeName"]].top(Infinity);
    var dataTableAttributes = visualization.getAttributes("dataTable");


    var len = TABLE_DATA.length;
  //var reqParams = iDisplayLength, iDisplayStart
  var start = req.query.start;
  var length = req.query.length;
  var TABLE_DATA = TABLE_DATA.slice(start, start+length)
  var DATA_ARRAY = [];
  for(var i in TABLE_DATA){
    //var row = Object.keys(TABLE_DATA[i]).map(function(k) { return TABLE_DATA[i][k] });
    var row = [];
    for(var j in dataTableAttributes){
      var attrName = dataTableAttributes[j]["attributeName"];
      row.push(TABLE_DATA[i][attrName]);
    }
    /*

    for(var j in TABLE_DATA[i]){
      //console.log(j)

      row.push(TABLE_DATA[i][j])
    }
    */
    DATA_ARRAY.push(row);
  }

  results = {
    data: DATA_ARRAY,
    active: all.value(),
    state: state,
    draw: req.query.draw,
    recordsTotal: dataSource.getTotalRecords(),      //FIX THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!
    recordsFiltered: len
  }
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(JSON.stringify(results));
};


module.exports = router;
