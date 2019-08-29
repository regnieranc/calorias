import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition, Select, Input, Divider, Button, Checkbox, Placeholder, Table} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'

const abecedario = [
	{key:'A', value:'A', text:'A'},
	{key:'B', value:'B', text:'B'},
	{key:'C', value:'C', text:'C'},
	{key:'D', value:'D', text:'D'},
	{key:'E', value:'E', text:'E'},
	{key:'F', value:'F', text:'F'},
	{key:'G', value:'G', text:'G'},
	{key:'H', value:'H', text:'H'},
	{key:'I', value:'I', text:'I'},
	{key:'J', value:'J', text:'J'},
	{key:'K', value:'K', text:'K'},
	{key:'L', value:'L', text:'L'},
	{key:'M', value:'M', text:'M'},
	{key:'N', value:'N', text:'N'},
	{key:'Ñ', value:'Ñ', text:'Ñ'},
	{key:'O', value:'O', text:'O'},
	{key:'P', value:'P', text:'P'},
	{key:'Q', value:'Q', text:'Q'},
	{key:'R', value:'R', text:'R'},
	{key:'S', value:'S', text:'S'},
	{key:'T', value:'T', text:'T'},
	{key:'U', value:'U', text:'U'},
	{key:'V', value:'V', text:'V'},
	{key:'W', value:'W', text:'W'},
	{key:'X', value:'X', text:'X'},
	{key:'Y', value:'Y', text:'Y'},
	{key:'Z', value:'Z', text:'Z'},
]

const cantidadAlimento = [
	{key:1, value:1, text:1},
	{key:2, value:2, text:2},
	{key:3, value:3, text:3},
	{key:4, value:4, text:4},
	{key:5, value:5, text:5},
]

export default class Calorias extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	animacion:false,
	  	cantidadCalorias:'',
	  	toggle:true,
	  	busquedaAvanzada:false
	  };
	}

	handleToggle = (valor, estado) => {
		if(estado==1){
			this.setState({toggle:!valor})
		}else{
			this.setState({busquedaAvanzada:!valor})
		}
		
	}

	componentDidMount(){
		this.setState({animacion:true})
	}
	render(){
		const {toggle} = this.state
		return(
			<div>
				<Headers />
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
				    
				    	
				    	<Transition visible={!this.state.busquedaAvanzada} animation={'fly up'} duration={1000}>
					    	<div><Row>
								<Col lg={3}>
									<Select options={abecedario} fluid size={'large'} placeholder='Selecciona una letra'/><Divider hidden />
							    </Col>
							    <Col lg={3}>
							        <Select options={abecedario} fluid size={'large'} placeholder='Selecciona un Alimento'/><Divider hidden />
							    </Col>
							    <Col lg={3}>
							    {
							    	toggle?
							        <Select options={cantidadAlimento} fluid placeholder='Selecciona cantidad consumida' />:
							        <Select options={cantidadAlimento} fluid placeholder='Selecciona cantidad consumida' disabled/>
							    }<Divider hidden />
							    </Col>
							    <Col lg={3}>
							        <Input size='large'  placeholder='Cantidad Calorias' fluid disabled value={this.state.cantidadCalorias}/><Divider hidden />
							    </Col>
							</Row>
							<Row>
								<Col sm={3} style={{textAlign:'center'}}>
									<h3 style={{ marginBottom:3}}>Ingresar </h3>
									<Checkbox toggle checked={toggle} onChange={() => this.handleToggle(this.state.toggle, 1)}/>
								</Col>
								<Col sm={3} style={{textAlign:'center'}}>
									<h3 style={{ marginBottom:3}}>Buscar </h3>
									<Checkbox toggle checked={!toggle} onChange={() => this.handleToggle(this.state.toggle, 1)}/>
									
								</Col>
								<Col sm={3}>
								{
									toggle?
									<Button color='green' content='Agregar' size='large' fluid style={{marginTop:5}}/>:
									<Button color='green' content='Agregar' size='large' fluid style={{marginTop:5}} disabled/>
								}
								</Col>
								<Col sm={3}>
								{
									toggle?
									<Button color='purple' content='Buscar' size='large' fluid style={{marginTop:5}} disabled/>:
									<Button color='purple' content='Buscar' size='large' fluid style={{marginTop:5}}/>
								}
								</Col>
							</Row></div>
						</Transition> 
						<Transition visible={this.state.busquedaAvanzada} animation={'fly down'} duration={1000}>
							<div>
								<Row>
									<Col lg={4} debug>
										sd
									</Col>
									<Col lg={4} debug>
										f
									</Col>
									<Col lg={4} debug>
										df
									</Col>
								</Row>
							</div>
						</Transition>
				    
						
						<Row>
							<Col style={{textAlign:'center'}}><Divider hidden />
								<h3>{this.state.busquedaAvanzada? 'Desactivar':'Activar'} busqueda avanzada</h3>
								<Checkbox toggle checked={this.state.busquedaAvanzada} onChange={() => this.handleToggle(this.state.busquedaAvanzada, 0)}/>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
							    <Divider hidden /><Divider hidden /><Divider hidden />
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
								    			<Table.HeaderCell>Fecha</Table.HeaderCell>
								    			<Table.HeaderCell>Cantidad</Table.HeaderCell>
									            <Table.HeaderCell>Alimento</Table.HeaderCell>
									            <Table.HeaderCell>Calorias</Table.HeaderCell>	
									            <Table.HeaderCell>Accion</Table.HeaderCell>
									        </Table.Row>
									    </Table.Header>
									    <Table.Body>
									    	<Table.Row>
									    		<Table.Cell>dfgdfg</Table.Cell>
									    		<Table.Cell>dfgdfg</Table.Cell>
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
			</div>
		)
	}
}