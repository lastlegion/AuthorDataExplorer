var jQuery = require('jquery');
var React = require('react');
var request = require('superagent');
var Router = require('react-router');

var AppActions = require('../actions/AppActions.jsx')


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
  mixins: [Router.Navigation],

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
        var sourceType = this.state.sourceType;
        var sourceName = this.state.sourceName;
        var dataSources = this.state.dataSources,
                    dataSourceConfig = this.state.dataSourceConfig;
        var options = {};

        switch(sourceType){

            case "csvFile":
            case "jsonFile":
                options = this.state.files[0].name;

                options = {
                    "path": "data/"+options
                };
                break;
            case "csvREST":
            case "jsonREST":
                var hostName = this.state.hostName;
                var port = this.state.port *1;
                var path = this.state.path;
                var headers = this.state.headers;
                options = {
                    hostName : hostName,
                    port: port,
                    path :path,
                    headers: headers
                }
                break;

        }
        dataSourceConfig["dataSources"].push({
            "sourceName": this.state.sourceName,
            "sourceType": this.state.sourceType,
            "options": options
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
        console.log(sourceType)
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
        console.log(files)
        var file = {};
        if(files.length > 0)
            file = files[0];

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
            console.log(self.context.router);
            AppActions.dataSourceConfig(data);
            console.log(data);
            self.setState({attributes: data});
            self.transitionTo('interactiveFilters')
        })
    },
    showDataSourceConfig: function(){
        this.setState({showDataSourceConfig: true});
    },
    onJoinKey: function(event){
      var dataSourceConfig = this.state.dataSourceConfig;
      dataSourceConfig["joinKey"] = event.target.value;
      console.log(dataSourceConfig);
      this.setState({joinKey: event.target.value, dataSourceConfig: dataSourceConfig });

    },
    dontShowDataSourceConfig: function(){

        this.setState({showDataSourceConfig: false});
    },
    handleHostName: function(event){
        this.setState({hostName: event.target.value});
    },
    handlePath: function(event){
        this.setState({path: event.target.value});
    },
    handlePort: function(event){
        this.setState({port: event.target.value});
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
                    <div id="dataSourcesPanel">
                        <h3>Data sources</h3>
                        <DataSources dataSources={self.state.dataSources}/>

                        <Button bsStyle='success' onClick={this.open} id="addDataSource"> <Glyphicon glyph='glyphicon glyphicon-plus' /> Add</Button>
                            <br />
                              {
                                this.state.dataSources.length > 1 ?
                                  <Input labelClassName='col-xs-1' wrapperClassName='col-xs-4' type='text' id="joinKey" onChange={this.onJoinKey} label="Join key" />
                                :
                                  <div />
                              }
                        <br />

                        {
                        this.state.dataSources.length ?
                            <div>
                            <Button bsStyle='primary' onClick={this.loadData} id="btnLoadData">Load Data</Button>
                            <Button bsStyle='default' onClick={this.showDataSourceConfig}>dataSource.json</Button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>

    			        <Modal show={self.state.showModal} onHide={this.close} id="modAddDataSource" >
    			          <Modal.Header closeButton>
    			            <Modal.Title>Add Data Source</Modal.Title>
    			          </Modal.Header>
    			          <Modal.Body>
    			            <form className='form-horizontal' encType="multipart/form-data" id="addDataSourceForm">
    					    	<Input type='text' onChange={this.handleSourceName} id='sourceName' label='sourceName' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
    						    <Input type='select' onChange={this.selectType} id='sourceType' value={this.sourceType} label='sourceType' placeholder='select'  labelClassName='col-xs-2' wrapperClassName='col-xs-10' >
    						      <option value='csvFile'>CSV File</option>
    						      <option value='jsonFile'>JSON File</option>
                                  <option value='csvREST'>CSV REST</option>
                                  <option value='jsonREST'>JSON REST</option>
                                  <option value='odbc'>ODBC</option>

    						    </Input>

                                {

                                    this.state.sourceType == "csvFile" || this.state.sourceType =="jsonFile" ?
                                        <div id="fileStuff">
                                            <div id="sourceFile" >
                                            <Dropzone ref="dropzone" onDrop={self.onDrop} size={150} style={{margin: 10, border:1, borderColor: "grey", borderStyle: "dashed", width:500}} >
                                                <div style={{padding: "10"}}>Drop file here</div>
                                            </Dropzone>
                                            </div>

                                            {filesComponent}
                                            <Input type='text' label='path' labelClassName='col-xs-2' value={fileName} wrapperClassName='col-xs-10' disabled/>
                                        </div>
                                    :
                                        <div id="restStuff">
                                            <Input type='text' onChange={this.handleHostName} id='hostName' label='hostName' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />
                                            <Input type='text' onChange={this.handlePort} id='port' label='Port' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />
                                            <Input type='text' onChange={this.handlePath} id='path' label='Path' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />
                                            <Input type='textarea' label='Headers' placeholder='' labelClassName='col-xs-2' wrapperClassName='col-xs-6' />

                                        </div>
                                }

                                <Button bsStyle='success' onClick={this.add} id="addSingleSourceButton">Add</Button>



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
                        Data table
                    </div>
                    :
                    <div />
                }

            </div>
        );
    }
});

module.exports = DataSourcesPanel;
