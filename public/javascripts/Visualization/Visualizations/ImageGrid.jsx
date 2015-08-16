var React  = require('react');


var ImageGrid = React.createClass({
    getInitialState: function(){

        return {
            gridState: 0,
            images: {},

        }
    },
    componentDidMount:  function() {
      var gridState = 0;
      var self = this;
      $.get("/imageGrid/next?state="+gridState, function(data){
        self.setState({
          gridState: 0,
          images: data
        })
      })
    },
    componentWillReceiveProps: function(){
      /*
        var self =this;
        var currData = this.props.currData;
        var paginate = this.props.currData["imageGrid"].paginate;
        console.log(currData);
        console.log("reciveing props woot")
        self.setState({gridState: 0, currData: currData, images: currData, paginate: paginate});
        */

    },
    onPrev: function(e){
        var self = this;
        e.preventDefault();
        var gridState = this.state.gridState;
        gridState--;

        $.get("/imageGrid/next?state="+gridState, function(data){

            self.setState({
                gridState: gridState,
                images: data
            });
        });

    },
    onNext: function(e){
        var self = this;
        e.preventDefault();
        var gridState = this.state.gridState;
        gridState++;
        $.get("/imageGrid/next?state="+gridState, function(data){
            console.log(data);
            self.setState({
                gridState: gridState,
                images: data
            });
        });

    },

    render: function(){
        var self = this;

        var self =this;
        var config = this.props.config;
        var images = this.state.images;
        var paginate = true;
        var imageGridAttribute = config.attributes[0];
        if(imageGridAttribute){
          imageGridAttribute = imageGridAttribute.attributeName;
        } else {
          imageGridAttribute = ""
        }

        if(images["imageGrid"]){
          var gridState = self.state.gridState;
          var finalState = images["imageGrid"]["finalState"]

          //console.log(images)
          var rows = images["imageGrid"]["values"]

          var Img = rows.map(function(d){
              //imageGridAttribute = "image"
                //console.log()
                //imageGridAttribute = imageGridAttribute.attributeName;
                var image = d[imageGridAttribute];
                //console.log(image)
                //console.log(d)
                return (


                        <img src={image} width="60px" height="60px" style={{margin: "2px"}}/>

                );


          });

                  if(paginate == true){
                      if(gridState == 0){
                          return(

                              <div id="imageGrid" >
                                  <div id="imageGridImages">
                                          {Img}
                                  </div>
                                 <div id="imageGridPagination">
                                      <a href="#" className="next" onClick={this.onNext} >Next</a>
                                  </div>
                              </div>

                          );
                      } else if(gridState == finalState) {

                          return(
                              <div id="imageGrid" >
                                  <div id="imageGridImages">
                                          {Img}
                                  </div>
                                 <div id="imageGridPagination">
                                      <a href="#" className="prev" onClick={this.onPrev}>Prev</a>
                                  </div>
                              </div>
                          );
                      } else {
                          return(
                              <div id="imageGrid" >
                                  <div id="imageGridImages">
                                          {Img}
                                  </div>
                                 <div id="imageGridPagination">
                                      <a href="#" className="prev" onClick={this.onPrev}>Prev</a>
                                      <a href="#" className="next" onClick={this.onNext}>Next</a>
                                  </div>
                              </div>
                          );
                      }

                  } else {
                      return(

                          <div id="imageGrid" >
                              <div id="imageGridImages">
                                      {Img}
                              </div>

                          </div>

                      );

                  }

        } else {
          return (<div>Loading data..</div>)
        }

    }
});

module.exports = ImageGrid;
