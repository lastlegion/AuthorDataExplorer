var jQuery = require('jquery');
var React = require('react');
var request = require('superagent');

var dc = require('dc');

/*Bootstrap stuff*/
var bootstrap = require('bootstrap');
var Button = require('react-bootstrap').Button,
    Panel = require('react-bootstrap').Alert,
    Modal = require('react-bootstrap').Modal,
    Input = require('react-bootstrap').Input,
    Well = require('react-bootstrap').Well,
    Collapse = require('react-bootstrap').Collapse,
    Glyphicon = require('react-bootstrap').Glyphicon;

/*Other external components*/
var Dropzone = require('react-dropzone'),   //Drag-drop files
    Highlight = require('react-highlight'); //Syntax highlighting


var Chart = React.createClass({

    componentDidMount: function(){



        var self = this;
        var attributeName = self.props.name;
        console.log(self.props.data);
        console.log(attributeName);
        console.log(self.props.attributeName)
        var chartData = self.props.data[attributeName];
        console.log(chartData)


        var dim = {
            filter: function(f) {

            },
            filterAll: function() {
            },
            name: function(){
                    return attributeName;
            }
       
        };
        var group = {
                all: function() {
                    console.log(chartData.values)
                    return chartData.values;
                },
                order: function() {
                    return chartData;
                    //return groups[attributeName];
                },
                top: function() {
                    return chartData.values;
                    //return self.props.currData[attributeName].values;
                }
 
        };

        var self = this;
        var visType = "barChart";
        var divId = "#chart"
        var domain = [0,100]
        //var domain = this.props.config.domain || [0,100];
        var c = {};
        //Render according to chart-type
        switch(visType){
            case "pieChart":
                c   = dc.pieChart(divId);
                c.width(250)
                .height(190).dimension(dim)
                .group(group)
                .radius(90)
                .renderLabel(true);
                c.filterHandler(function(dimension, filters){
                  if(filters)
                    dimension.filter(filters);
                  else
                    dimension.filter(null);
                  return filters;
                });
                break;
            case "barChart":
                c = dc.barChart(divId);
                c.width(220)
                    .height(190).dimension(dim)
                    .group(group)
                    .x(d3.scale.linear().domain(domain))
                    .elasticY(true)
                    .elasticX(true)        
                    .renderLabel(true)
                    .margins({left: 35, top: 10, bottom: 20, right: 10})
                    c.filterHandler(function(dimension, filter){

                        var begin = $("#filterBeg"+dimension.name());
                        var end = $("#filterEnd"+dimension.name());
                        if(filter.length > 0 && filter.length!=2){
                           filter = filter[0]
                        }
                        begin.val(filter[0]);
                        end.val(filter[1]);
                        dimension.filter(filter);
                        return filter;
                    });

                break;
            case "rowChart":
                c = dc.rowChart(divId);
                c.width(250)
                .height(190)
                .dimension(dim)
                .group(group)
                .renderLabel(true)
                .elasticX(true)
                .margins({top: 10, right: 20, bottom: 20, left: 20});
                c.filterHandler(function(dimension, filters){
                    if(filters)
                        dimension.filter(filters);
                    else
                        dimension.filter(null);
                    return filters;
                })     
        }
        dc.renderAll();
        this.setState({chart: c});
    },    

    componentWillMount: function(){

    },
    render: function(){
        var self = this;
        console.log(self)
        if(self.props.chartVisible){
            return(
                <div style={{height: 270,  clear: "both", display: "block"}} id="chart" className="col-xs-12" />
            );
        } else {
            return(
                <div></div>
            );
        }
    }
})

var AttributeBox = React.createClass({
    getInitialState: function(){
        return({isFilteringAttribute: false, isVisualAttribute: false, chartData: {}, attributeOptions: false});
    },
    handleFilteringAttribute: function(){
        
        var self = this;
        var isFilteringAttribute = self.isFilteringAttribute;

        if(isFilteringAttribute){
            self.setState({isFilteringAttribute: false});
        } else {

            $.get("/addFilteringAttribute?attribute="+encodeURIComponent(self.props.name), function(data){
                //we should get information required for rendering charts here.
                console.log(data);
                self.setState({isFilteringAttribute: true, chartData: data});

            })
            //console.log("well add it to the dimensions list")
        }
        
    },
    handleAttributeOptions: function(){
        var attributeOptions = this.state.attributeOptions;

        this.setState({attributeOptions: !attributeOptions})
    },
    render: function(){
        var self = this;
        var attribute = this.props.name;
        return (
            <div bsSize='small' className="attribute">
                <div className="attributeHeader">
                    
                    <div className="attributeName">{attribute}</div> 
                    <div className="attributeCollapse" onClick={this.handleAttributeOptions}>

                    {self.state.attributeOptions ?
                        <Glyphicon glyph="glyphicon glyphicon-menu-up" />
                    :
                        <Glyphicon glyph="glyphicon glyphicon-menu-down" />
                    }
                    </div>
                </div>
                <Collapse in={this.state.attributeOptions}>
                    <div class="attributeProperties" style={{clear: "both"}}>
                        <Input type='checkbox' label='FilteringAttribute' value = {self.state.isFilteringAttribute} onChange={this.handleFilteringAttribute}/>
                        
                        {self.state.isFilteringAttribute ?
                            <Chart chartVisible={this.state.isFilteringAttribute} data={this.state.chartData} name={attribute} />
                        :
                            <div />
                        }
                        <div style={{display: "block"}}>
                        <Input type='checkbox' label='VisualAttribute' />
                       
                        Summary Statistics <br />
                            <ul>
                                <li>Mean: </li>
                                <li>Type: </li>
                            </ul>
                        </div>
                    </div>
                </Collapse>

            </div>
        );      
    }

})

var Attributes = React.createClass({

    render: function(){
        var self = this;
        var Attribute = <div />
        if(self.props.attributes ){

            Attribute = self.props.attributes.map(function(attribute){
                console.log(attribute)
                return (

                    <AttributeBox name={attribute} />
                );      
            });

        }
        
        return(
            <div>
            {Attribute}
            </div>
        )
    }
});

    var DataSources = React.createClass({

        render: function(){
            var self = this;
            var Sources = self.props.dataSources.map(function(dataSource){
                return(

                    <div style={{border: 1, borderStyle: "dashed", padding: 10, margin: 10}} className="col-md-3 dataSourceSnap"> 
                        sourceName: {dataSource.name}

                    </div>
                );
            })
            return(
                <div className="row">{Sources}</div>
            );
        }
    });

    var DataSourcesPanel = React.createClass({

    	getInitialState(){
    		return { 
                showModal: false, 
                files:[], 
                dataSources: [], 
                sourceName: "", 
                sourceType: "csvFile", 
                options: {}, 
                showDataSourceConfig:false,
                dataSourceConfig: {
                    "dataSourceAlias": "",
                    "dataSources": []
                },
                attributes: []
            };
    	},

        close(){
            this.setState({ showModal: false });
        },
    	add(){
    		this.setState({ showModal: false });
            var sourceName = this.state.sourceName;
            var sourceType = this.state.sourceType;
            var options = this.state.files[0].name;
            var dataSources = this.state.dataSources,
                dataSourceConfig = this.state.dataSourceConfig;

            var path = "data/"+options;
            dataSourceConfig["dataSources"].push({
                "sourceName": this.state.sourceName,
                "sourceType": this.state.sourceType,
                "options":{
                    "path": path
                }
            });
            dataSources.push({"name": sourceName, sourceType: sourceType, "options": options })
            console.log(dataSources)
            this.setState({dataSources: dataSources});

    	},

    	open(){
    		this.setState({ showModal: true });
    	},
        handleChange: function(field, e){
            var nextState = {}
            nextState[field] = e.target.checked;
            this.setState(nextState)
        },
        addDataSource: function(){

        },
        selectType: function(event){

            this.setState({sourceType: event.target.value});

        	//this.setState({sourceType: "file"});
        },
        handleSourceName: function(event){
            this.setState({sourceName: event.target.value});

        },  
        handledataSourceAlias: function(event){
            var dataSourceConfig  = this.state.dataSourceConfig;
            dataSourceConfig["dataSourceAlias"] = event.target.value;
            this.setState({dataSourceAlias: event.target.value, dataSourceConfig: dataSourceConfig})

        },
        onDrop: function(files){
            var dataSourceConfig = this.state.dataSourceConfig;
            var req = request.post('/upload');

            var file = files[0];
            console.log(file)
            req.attach(file.name, file)
            req.end(function(){

            	console.log("...");
            }).on('progress', function(e) {
        		console.log('Percentage done: ', e.percent);	
     		});
            console.log('Received files: ', files);

            this.setState({
              files: [file]
            });


        },
        loadData: function(){
            console.log("load dataS");
            var self = this;
            var dataSourceConfig = this.state.dataSourceConfig;
            $.get("/loadData?dataSourceConfig="+encodeURIComponent(JSON.stringify(dataSourceConfig)), function(data){
                self.setState({attributes: data["attributes"]})
            })
        },
        showDataSourceConfig: function(){
            this.setState({showDataSourceConfig: true});
        },
        dontShowDataSourceConfig: function(){

            this.setState({showDataSourceConfig: false});
        },
        render: function(){
            var self = this;
            var fileName = "";
            if(self.state.files){
                var filesComponent = self.state.files.map(function(file){
                    fileName = "data/"+file.name;
                    return(
                        <div style={{padding:12}}>
                            Uploaded: {file.name}
                        </div>
                    );
                })  
            }

            return(
                <div className="row">
                    <div className="col-md-12">
                        <Panel id="dataSourcesPanel">
                            <h3>Data sources</h3>
                            <Input type='text' onChange={this.handledataSourceAlias} label='Data Source Alias' labelClassName='col-xs-3' wrapperClassName='col-xs-6' />
                            <br /><br />

                            <Button bsStyle='success' onClick={this.open}><Glyphicon glyph='glyphicon plus' /> Add</Button>
                            <DataSources dataSources={self.state.dataSources}/>
                            <br />
                            {
                            this.state.dataSources.length ? 
                                <div>
                                <Button bsStyle='primary' onClick={this.loadData}>Load Data</Button>
                                <Button bsStyle='default' onClick={this.showDataSourceConfig}>dataSource.json</Button>
                                </div> 
                                :
                                <div></div> 
                            }
                        </Panel>

        			        <Modal show={self.state.showModal} onHide={this.close}>
        			          <Modal.Header closeButton>
        			            <Modal.Title>Add Data Source</Modal.Title>
        			          </Modal.Header>
        			          <Modal.Body>
        			            <form className='form-horizontal' encType="multipart/form-data" >
        					    	<Input type='text' onChange={this.handleSourceName} label='sourceName' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
        						    <Input type='select' onChange={this.selectType} value={this.sourceType} label='sourceType' placeholder='select'  labelClassName='col-xs-2' wrapperClassName='col-xs-10' >
        						      <option value='csvFile'>CSV File</option>
        						      <option value='jsonFile'>JSON File</option>
                                      <option value='csvREST'>CSV REST</option>
                                      <option value='jsonREST'>JSON REST</option>
                                      <option value='odbc'>ODBC</option>
                                      
        						    </Input>
        						   	<Dropzone ref="dropzone" onDrop={self.onDrop} size={150} style={{margin: 10, border:1, borderColor: "grey", borderStyle: "dashed", width:500}} >
                      					<div style={{padding: "10"}}>Drop file here</div>
                    				</Dropzone>

                                    {filesComponent}
                                    <Input type='text' label='path' labelClassName='col-xs-2' value={fileName} wrapperClassName='col-xs-10' disabled/>

                                    <Button bsStyle='success' onClick={this.add}>Add</Button>
        					  	</form>
        			          </Modal.Body>
        			        </Modal>
                            <Modal show={self.state.showDataSourceConfig} onHide={this.dontShowDataSourceConfig}>
                              <Modal.Header closeButton>
                                <Modal.Title>dataSourceConfig.json</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Highlight className='javascript'>
                                    {JSON.stringify(this.state.dataSourceConfig, null, 2)}
                                </Highlight>

                              </Modal.Body>
                            </Modal>
                    </div>
                    {

                        this.state.attributes.length > 0 ?
                        <div>
                            <div className="col-xs-4" id="attributesPanel">
                              <div> 


                                <Attributes attributes={this.state.attributes} />
                              </div>
                            </div>
                            <div className="col-xs-8" id="visualizationPanel">
                                <h4>Visualizations</h4>
                            </div>
                        </div>
                        : 
                        <div />
                    }
  
                </div>
            );
        }
    });

module.exports = DataSourcesPanel;