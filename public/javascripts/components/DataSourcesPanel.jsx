var jQuery = require('jquery');
var React = require('react');
var request = require('superagent');

var AppActions = require('../actions/AppActions.jsx')

var mui = require('material-ui');



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

/*App components*/
var Attributes = require('./Attributes.jsx'),
    DataSources = require('./DataSources.jsx');





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
            AppActions.dataSourceConfig(data);
            self.setState({attributes: data["attributes"]});

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

            <div>
                <div className="col-md-12" style={{marginTop: "50"}}>
                    <Panel id="dataSourcesPanel">
                        <h3>Data sources</h3>
                        <DataSources dataSources={self.state.dataSources}/>

                        <Button bsStyle='success' onClick={this.open}><Glyphicon glyph='glyphicon glyphicon-plus' /> Add</Button>
                            <br />

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