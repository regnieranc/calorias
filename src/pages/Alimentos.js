import React, {Component} from 'react'
import Headers from './../components/Headers'
import {Redirect} from 'react-router-dom'
import {Hash, Role} from './../utils/constant'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition, Form, Input, Button, Divider, Segment, Checkbox, Placeholder, Table} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'

export default class Alimentos extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	r:'',
	  	response:true,
	  	animacion:false,
	  	toggle:true,
	  	cargando:false
	  };
	  
	}

	handleToggle = () => {
		this.setState({toggle:!this.state.toggle})
	}

	componentDidMount(){
		this.setState({animacion:true})
		if(localStorage.getItem(Role)===Hash && localStorage.getItem(Role)!=null){
			console.log(localStorage.getItem(Role))
			this.setState({r:localStorage.getItem(Role), response:false})
		}else{
			this.setState({response:false})
		}
	}

	render(){
		let accion 
		if(this.state.response){
			accion=null
		}else{
			if(this.state.r===Hash){
				accion=null
			}else{
				accion=<Redirect to='/' />
			}
		}

		let {toggle} = this.state
		return(
			<>
				<Headers />
				{
					accion	
				}


				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
						<Row>
							<Col sm={3} >
								<Form.Field> 
							        <Input size='large' placeholder='Nombre Alimento' fluid />
							    </Form.Field><Divider hidden />
						    </Col>
						    <Col sm={3} >
						       <Form.Field> 
						       {
						       		toggle?
							        	<Input size='large'  placeholder='Calorias' fluid /> :
							        	<Input size='large'  placeholder='Calorias' fluid disabled/>
						       }
							    </Form.Field><Divider hidden />
						    </Col>
						    <Col sm={3}>
						    {
						    	toggle?
						        <Button size='large'  color='green' content='Agregar' fluid />:
						        <Button size='large'  color='green' content='Agregar' fluid disabled/>
						    }<Divider hidden />
						    </Col>
						    <Col sm={3}>
						        {
						        	toggle?
						        	<Button color='purple' content='Buscar' size='large' fluid disabled/> :
						        	<Button color='purple' content='Buscar' size='large' fluid />
						        } <Divider hidden />
						    </Col>
						</Row>
						<Row>
							<Col sm={3} >
							</Col>
							<Col sm={3}  style={{textAlign:'center'}} >
									<h3>Ingresar </h3>
      								<Checkbox toggle checked={toggle} onChange={this.handleToggle}/>
							</Col>
							<Col sm={3} style={{textAlign:'center'}} >
      							<h3>Buscar</h3><Checkbox toggle checked={!toggle} onChange={this.handleToggle}/>
							</Col>
							<Col sm={3} >
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
							    <Divider hidden /><Divider hidden />
								{
									this.state.cargando?
									<Placeholder fluid style={{borderRadius: '4px'}}>
    									<Placeholder.Paragraph>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
								            <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
								            <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									        <Placeholder.Line  style={{backgroundColor: '#d2d2d2'}}/>
									    </Placeholder.Paragraph>
									</Placeholder>
								    :
								    <Table color={'purple'} inverted style={{textAlign:'center', cursor:'pointer'}}>
								    	<Table.Header>
								    		<Table.Row>
								    			<Table.HeaderCell>Alimento</Table.HeaderCell>
									            <Table.HeaderCell>Calorias</Table.HeaderCell>
									            <Table.HeaderCell>Accion</Table.HeaderCell>	
									        </Table.Row>
									    </Table.Header>
									    <Table.Body>
									    	<Table.Row>
									    		<Table.Cell>dfgdfg</Table.Cell>
									    		<Table.Cell>dfgdfg</Table.Cell>
									    		<Table.Cell><Button color='green'>Editar</Button><Button color='red'>Eliminar</Button></Table.Cell>
									    	</Table.Row>
									    </Table.Body>
									</Table>
								}
							</Col>
						</Row>
					</Container>
				</Transition>
			</>
		)
	}
}