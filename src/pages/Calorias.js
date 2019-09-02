import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion, Token, Role} from './../utils/constant'
import {Transition, Select, Input, Divider, Button, Checkbox, Placeholder, Table, Card, Icon, Form, Modal} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'
import Calendar from 'react-calendar'
import Moment from 'react-moment'
import moment from 'moment'
import Footer from './../components/Footer'
import {Redirect } from 'react-router-dom'
import validator from 'validator';

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
	{key:0.25, value:0.25, text:0.25},
	{key:0.5, value:0.5, text:0.5},
	{key:0.75, value:0.75, text:0.75},
	{key:1, value:1, text:1},
	{key:1.5, value:1.5, text:1.5},
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
	  	busquedaAvanzada:false,
	  	busqueda:{
	  		desde:new Date(),
	  		hasta:new Date(),
	  		alimento:'',
	  		calorias:'',
	  		cantidad:'',
	  		mayormenor:''
	  	},
	  	calendario:false,
	  	desdehasta:true,
	  	botonFecha:'Fecha Inicio',
	  	disableBoton:true,
	  	buscarTexto:'',
	  	botonTexto:true,
	  	vector:[],
	  	radio:true,
	  	caloriasInput:'',
	  	error:false,
	  	toggleCalorias:true
	  };
	}

	handleToggle = (valor, estado) => {
		if(estado==1){
			this.setState({toggle:!valor})
		}else{
			this.setState({busquedaAvanzada:!valor})
		}
		
	}

	toggleFecha = () => {
		this.setState({calendario:!this.state.calendario})
	}



	handleFecha = (date,valor) => {
		date = moment(date).format('DD/MM/YYYY')
		console.log(date)
		this.setState({calendario:!this.state.calendario})
		if(valor==1){
			//date lo puedo formatear con get date get day y get year y armar fecha segun la api
			this.setState(prevState => ({busqueda: { ...prevState.busqueda, desde:date}} ))
			this.setState({botonFecha:'Fecha Termino', desdehasta:false})
			const obj={
				title:'Fecha Inicio',
				content:date,
				icon:'calendar alternate outline'
			}
			this.setState(prevState => ({vector: [...prevState.vector,obj]}))
		}else{
			this.setState(prevState => ({busqueda: { ...prevState.busqueda, hasta:date}} ))
			this.setState({disableBoton:false})
			const obj={
				title:'Fecha Termino',
				content:date,
				icon:'calendar alternate outline'
			}
			this.setState(prevState => ({vector: [...prevState.vector,obj]}))
		}
	}

	quitarVector = (index) => {
		const vector=[]
		this.state.vector.map((ele, i) => {
			if(index!=i){
				vector.push(ele)

			}
		})
		 this.setState({vector})
	}

	textoChange = e => {
		const a = e.target.value
		this.setState({buscarTexto:a})
	}

	agregarTexto = () => {
		if(this.state.buscarTexto){
			const obj={
				title:'Alimento Buscado',
				content:this.state.buscarTexto,
				icon:'food'
			}
			this.setState(prevState => ({busqueda: { ...prevState.busqueda, alimento:this.state.buscarTexto}} ))
			this.setState(prevState => ({vector: [...prevState.vector,obj]}))
			this.setState({botonTexto:false})
		}else{
			this.setState({error:true})
		}
		
	}

	handleCalorias = () => {
		//si this.satte.radio es true, el valor a buscar es mayor, sino es menor
		console.log(this.state.radio)
		if(validator.isNumeric(this.state.caloriasInput) && this.state.caloriasInput>0){
			const obj={
				title:'Calorias Buscadas',
				content:'',
				icon:'user md'
			}
			if(this.state.radio){
				obj.content=`Mayor a ${this.state.caloriasInput}`
			}else{
				obj.content=`Menor a ${this.state.caloriasInput}`
			}
			this.setState(prevState => ({busqueda: { ...prevState.busqueda, cantidad:this.state.caloriasInput}} ))
			this.setState(prevState => ({busqueda: { ...prevState.busqueda, mayormenor:this.state.radio}} ))
			this.setState(prevState => ({vector: [...prevState.vector,obj]}))
			this.setState({toggleCalorias:false})
		}else{
			this.setState({error:true})
		}
		console.log(this.state.busqueda)
	} 

	handleLimpiar = () => {
		const busqueda={
	  		desde:new Date(),
	  		hasta:new Date(),
	  		alimento:'',
	  		calorias:'',
	  		cantidad:'',
	  		mayormenor:''
	  	}
		this.setState({vector:[], botonFecha:'Fecha Inicio', botonTexto:true, desdehasta:true, disableBoton:true,busqueda, radio:true, caloriasInput:'', buscarTexto:'', toggleCalorias:true })
	}

	componentDidMount(){
		this.setState({animacion:true})
	}
	render(){
		const {toggle} = this.state
		return(
			<div>
				<Headers />
				{
					(localStorage.getItem(Token))?
						null : <Redirect to='/'/>
				}
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
				    
				    	
				    	<Transition visible={!this.state.busquedaAvanzada} animation={'fly right'} duration={1000}>
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
							        <Select options={cantidadAlimento} fluid placeholder='Cantidad consumida' />:
							        <Select options={cantidadAlimento} fluid placeholder='Cantidad consumida' disabled/>
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
						<Transition visible={this.state.busquedaAvanzada} animation={'fly left'} duration={1000}>
							<div>
								<Row>
									<Col lg={4} style={{textAlign:'center'}}>
										{
											this.state.disableBoton?
											<Button style={{marginBottom:'10px'}} content={this.state.botonFecha} size='large' color='violet' fluid onClick={this.toggleFecha}/>:
											<Button style={{marginBottom:'10px'}} content={this.state.botonFecha} size='large' color='violet' fluid onClick={this.toggleFecha} disabled/>
										}
										{
											this.state.calendario?
											(
												this.state.desdehasta?
												<Calendar onChange={(value) => this.handleFecha(value,1)} value={this.state.busqueda.desde}/> :
												<Calendar onChange={(value) => this.handleFecha(value,2)} value={this.state.busqueda.hasta}/> 
											)
											
        									: null
        								}<Divider hidden />
									</Col>
									<Col lg={4} style={{textAlign:'center'}}>
										
										{
											this.state.botonTexto?
											(<>
												<Input placeholder='Ingresa el nombre del alimento' fluid value={this.state.buscarTexto} onChange={this.textoChange}/> 
												<Button content='Agregar' color='green' onClick={this.agregarTexto} style={{marginTop:'10px', width:'150px'}}/>
											</>) :
											(<>
												<Input placeholder='Ingresa el nombre del alimento' fluid value={this.state.buscarTexto} disabled/> 
												<Button content='Agregar' color='red' style={{marginTop:'10px', width:'150px'}} disabled/>
											</>)
										}<Divider hidden />
									</Col>
									<Col lg={4} style={{textAlign:'center'}}>
										<Input type='number' placeholder='Ingresa numero de calorias' fluid style={{marginBottom: '10px'}} value={this.state.caloriasInput} onChange={(e) => {
											if(e.target.value.length<=4){
												this.setState({caloriasInput:e.target.value})
											}
										}}
										disabled={!this.state.toggleCalorias}
										/>
										<Row>
											<Col xs={8}>
												<Form.Radio label={`Mayor que ${this.state.caloriasInput} kcal.`} checked={this.state.radio} onChange={() => this.setState({radio:!this.state.radio})} disabled={!this.state.toggleCalorias}/>
												<Form.Radio label={`Menor que ${this.state.caloriasInput} kcal.`} checked={!this.state.radio} onChange={() => this.setState({radio:!this.state.radio})} disabled={!this.state.toggleCalorias} style={{marginTop:'6px'}}/>
											</Col>
											<Col xs={4}>
												<Button content='Agregar' color={!this.state.toggleCalorias? 'red' : 'green'} disabled={!this.state.toggleCalorias} onClick={this.handleCalorias} />
											</Col>
										</Row>
										
									</Col> 
								</Row>
								
								<Row style={{textAlign:'center'}}>
									
									{
										this.state.vector?
										this.state.vector.map((ele, index) => {
											return(
												<Col style={{marginTop:'15px'}} key={index} sm={3} >
													<Card style={{margin:10}} fluid>
														<Card.Content>
															<Icon name={ele.icon} floated='right' size='big' style={{color:'gray', marginBottom:'10px'}}/>
										        			<Card.Header>{ele.title}</Card.Header>
										        			<Card.Meta>Busqueda Avanzada</Card.Meta>
													        <Card.Description>{ele.content}</Card.Description>
												        </Card.Content>
										      		</Card>
									      		</Col>
										)}) : null

									}
									
								</Row>
								<Row style={{textAlign:'center', marginTop:'20px'}}>
									<Col>
										<Button content='Buscar' color='green' style={{width:'150px', height:'40px'}}/>
									</Col>
									<Col>
										<Button content='Limpiar' color='red' style={{width:'150px', height:'40px'}} onClick={this.handleLimpiar}/>
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

						{
							this.state.error?
							<Modal size={'mini'} open={this.state.error} onClose={() => {this.setState({error:false})}}>
					            <Modal.Header style={{textAlign:'center'}}>Error en la validacion</Modal.Header>
					            <Modal.Content style={{marginTop:0, textAlign:'center', color:'black'}}>
					                <p>El valor ingresado no es valido</p>
					            </Modal.Content>
					            <Modal.Actions>
					            	<Button
					                    positive
					                    icon='checkmark'
					                    labelPosition='right'
					                    content='Ok'
					                    onClick = {() => {this.setState({error:false})}}
					                />
					            </Modal.Actions>
					        </Modal> : null
						}
						<Footer />
					</Container>
				</Transition>
			</div>
		)
	}
}