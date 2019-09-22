import React from 'react'
import {Table, Button, Modal, Input} from 'semantic-ui-react'
import validator from 'validator';

export default class index extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	confirmar:false,
	  	ele:'',
	  	editar:false
	  };
	}
	confirmar = (ele) => {
		this.setState({confirmar:true, ele, editar:false})
		//this.props.eliminar(ele)
	}

	handleSi = () => {
		this.props.eliminar(this.state.ele)
		this.setState({confirmar:false})
	}

	handleNo = () => {
		this.setState({confirmar:false})
	}

	handleSiEdit = () => {
		this.props.editar(this.state.ele)
		this.setState({confirmar:false})
	}
	render(){
		return(
			<React.Fragment>
				<Table color={'purple'} inverted style={{textAlign:'center', cursor:'pointer'}} selectable >
			    	<Table.Header>
			    		<Table.Row>
			    			{
			    				this.props.headers.map((ele, index) => {
			    					return(
			    						<Table.HeaderCell key={ele}>{ele}</Table.HeaderCell>
			    					)
			    				})
			    			}
			    				{
			    					this.props.botones?
			    					<Table.HeaderCell key={'Accion'}>{'Accion'}</Table.HeaderCell>:null
			    				}
			    			
				        </Table.Row>
				    </Table.Header>
				    <Table.Body>
				    {
				    	this.props.data.map((ele, i) => {
				    		return (

			    				<Table.Row key={i}>
			    				{
			    					this.props.json.map((json, index) => <Table.Cell key={json}>{ele[json]}</Table.Cell>)
			    					
			    				}
			    				{
			    					this.props.botones?
			    					<Table.Cell>
				    					{//*Button color='green' onClick={() => this.props.editar(ele)}>Editar</Button>} */}
				    				}
				    					<Button color='green'onClick={() => {
				    						this.confirmar(ele)
				    						this.setState({editar:true})
				    					}} disabled={this.props.btnEditar? false : true} >Editar</Button>
				    					<Button color='red'onClick={() => this.confirmar(ele)} disabled={this.props.btnEliminar? false : true}>Eliminar</Button>
				    				</Table.Cell> : null
			    				}
				    				
				    			</Table.Row>
				    		) 
				    	})
				    }
				    </Table.Body>
				</Table>
				{
					!this.state.editar?
						<Modal size={'mini'} open={this.state.confirmar}>
  						<Modal.Header style={{textAlign:'center'}}>Eliminar!!</Modal.Header>
							<Modal.Content  style={{marginTop:0, textAlign:'center', color:'black'}}>
								<p>¿Esta seguro de eliminar los datos?</p>
							</Modal.Content>
							<Modal.Actions>
							<Button positive onClick={() => this.handleSi()}>Si</Button>
							<Button negative onClick={this.handleNo}>No</Button>
						</Modal.Actions></Modal> :

						<Modal size={'huge'} open={this.state.confirmar}><Modal.Header style={{textAlign:'center'}}>Editar!!</Modal.Header>
							<Modal.Content  style={{marginTop:0, textAlign:'center', color:'black'}}>
								<Table color={'purple'} style={{textAlign:'center', cursor:'pointer'}}>
									<Table.Header>
			    						<Table.Row>
			    						{
			    							this.props.headers.map(ele => <Table.HeaderCell key={ele}>{ele}</Table.HeaderCell>)
			    						}
			    						</Table.Row>
				   	 				</Table.Header>
				   	 				<Table.Body>
				   	 					<Table.Row>
				   	 					{
				   	 						this.props.json.map((json, index) => {
				   	 							console.log(json)
				   	 							return(
				   	 								<Table.Cell key={index}><Input fluid value={this.state.ele[json]} onChange={e => {
							   	 							let obj = this.state.ele
							   	 							if(validator.isNumeric(this.state.ele[json])){
								   	 							if(validator.isNumeric(e.target.value)){
								   	 								obj[json]=e.target.value
								   	 								this.setState({ele:obj})
								   	 							}else{
								   	 								if(e.target.value==''){
								   	 									obj[json]=''
								   	 								    this.setState({ele:obj})
								   	 								}
								   	 							}
							   	 							}else{
							   	 								obj[json]=e.target.value
								   	 								this.setState({ele:obj})
							   	 							}
							   	 							
							   	 							
					   	 							}} /> </Table.Cell>
					   	 						)
				   	 						})
				   	 					}
				   	 				</Table.Row>
				   	 				</Table.Body>
								</Table>
							</Modal.Content>
							<Modal.Actions>
							<Button positive onClick={() => this.handleSiEdit()}>Si</Button>
							<Button negative onClick={this.handleNo}>No</Button>
						</Modal.Actions>
						</Modal>
			
				}
			</React.Fragment>
		)
	}
	
}

