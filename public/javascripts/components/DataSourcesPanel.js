

    var DataSources = React.createClass({

        render: function(){
            var self = this;
            var Sources = self.props.dataSources.map(function(dataSource){
                return(

                    <div style={{border: 1, borderStyle: "dashed", padding: 10, margin: 10}} className="col-md-1 dataSourceSnap"> 
                        {dataSource.name}
                        <br />
                        {dataSource.sourceType}
                        <br />
                        {dataSource.options}
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
    		return { showModal: false, files:[], dataSources: [], sourceName: "", sourceType: "csvFile", options: {} };
    	},

        close(){
            this.setState({ showModal: false });
        },
    	add(){
    		this.setState({ showModal: false });
            var sourceName = this.state.sourceName;
            var sourceType = this.state.sourceType;
            var options = this.state.files[0].name;
            var dataSources = this.state.dataSources;

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

            console.log("setting file")
            this.setState({sourceType: event.target.value});

        	//this.setState({sourceType: "file"});
        },
        handleSourceName: function(event){
            this.setState({sourceName: event.target.value});

        },  
        onDrop: function(files){
            var req = request.post('/upload');
            console.log(files);
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
                    <Panel id="dataSourcesPanel">
                        <h3>Data sources</h3>
                        <Button bsStyle='success' onClick={this.open}><Glyphicon glyph='glyphicon plus' /> Add</Button>
                        <DataSources dataSources={self.state.dataSources}/>
                        <br />
                        <Button bsStyle='primary'>Load Data</Button>

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
    						      <option value='jsonFile'>CSV JSON</option>
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
                </div>
            );
        }
    });