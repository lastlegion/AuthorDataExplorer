
var fs = require("fs");
//var visualization = require("./visualization");
var crossfilter = require("crossfilter")

var interactiveFilters = (function(){

    //Crossfilter specific
    // - **dimensions** stores an array of dimensions.
    // - **groups** stores an array of groups.
    // - **ndx** is the crossfilter object.
    var dimensions = {},
      groups = {},
      ndx,
      filter = {};

    //
    //#### applyCrossfilter()
    //Applies crossfilter to all the ```dimensions``` and ```groups```
    //

    var _applyCrossfilter = function(data){

        
        ndx = crossfilter(data);
    }

    return {
        applyCrossfilter: _applyCrossfilter,
        addDimension: function(name,body){
          dimensions[name] = body;
        },
        addGroup: function(name, body){
          groups[name] = body;
        },
        getDimensions: function(){
            return dimensions;
        },
        getGroups: function(){
            return groups;
        },
        getndx: function(){
            return ndx;
        }
    }

})();
 
module.exports = interactiveFilters;