import React from 'react'
import {Table, Button, Modal} from 'semantic-ui-react'

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
		this.setState({confirmar:true, ele})
		//this.props.eliminar(ele)
	}

	handleSi = () => {
		this.props.eliminar(this.state.ele)
		this.setState({confirmar:false})
	}

	handleNo = () => {
		this.setState({confirmar:false})
	}
	render(){
		return(
			<>
				<Table color={'purple'} inverted style={{textAlign:'center', cursor:'pointer'}}>
			    	<Table.Header>
			    		<Table.Row>
			    			{
			    				this.props.headers.map(ele => {
			    					return(
			    						<Table.HeaderCell key={ele}>{ele}</Table.HeaderCell>
			    					)
			    				})
			    			}
				        </Table.Row>
				    </Table.Header>
				    <Table.Body>
				    {
				    	this.props.data.map(ele => {
				    		return (
			    				<Table.Row key={ele.nombre}>
			    				{
			    					!this.state.editar?
			    					this.props.json.map(json => <Table.Cell key={json+json}>{ele[json]}</Table.Cell>)
			    					:
			    					this.props.json.map(json => <Table.Cell key={json+json}>sdjkfhkj</Table.Cell>)
			    				}
			    				{
			    					this.props.botones?
			    					<Table.Cell>
				    					{//*Button color='green' onClick={() => this.props.editar(ele)}>Editar</Button>} */}
				    				}
				    					<Button color='green'onClick={() => this.setState({editar:true})}>Editar</Button>
				    					<Button color='red'onClick={() => this.confirmar(ele)}>Eliminar</Button>
				    				</Table.Cell> : null
			    				}
				    				
				    			</Table.Row>
				    		) 
				    	})
				    }
				    </Table.Body>
				</Table>
				{
					this.state.confirmar?
					<Modal size={'mini'} open={this.state.confirmar}>
  						<Modal.Header style={{textAlign:'center'}}>Acceso no autorizado!!</Modal.Header>
							<Modal.Content  style={{marginTop:0, textAlign:'center', color:'black'}}>
								<p>¿Esta seguro de eliminar los datos?</p>
							</Modal.Content>
							<Modal.Actions>
							<Button positive onClick={() => this.handleSi()}>Si</Button>
							<Button negative onClick={this.handleNo}>No</Button>
						</Modal.Actions>
					</Modal> : null
				}
			</>
		)
	}
	
}

