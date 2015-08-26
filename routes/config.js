var express = require('express');
var router = express.Router();
var fs = require('fs');



router.post("/dataSource", function(req, res, next){
  var config = JSON.parse(req.body.dataSourceConfig);
  dataSourceConfig = config;
  res.setHeader('Content-Type', 'application/json');
  res.send(config);
})



router.post("/all", function(req, res, next){
  console.log(req.body);
  dataSource = JSON.parse(req.body.dataSourceConfig);
  dataDescription = JSON.parse(req.body.dataDescriptionConfig);
  interactiveFilters = JSON.parse(req.body.interactiveFiltersConfig);
  visualization = JSON.parse(req.body.visualizationConfig);

  res.setHeader('Content-Type', 'application/json');
  res.send({done: true});
})

router.get("/dataSource.json", function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(dataSource));
})

router.get("/dataDescription.json", function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(dataDescription));
})


router.get("/interactiveFilters.json", function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(interactiveFilters));
})

router.get("/visualization.json", function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(visualization));
})




module.exports = router;
