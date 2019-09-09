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
import {DisplayFood, MeApi, SaveCalorias, ShowCalorias, DeleteCalorias, FindCalorias, AdvanceCalorias} from './../utils/api'
import {MyHeaders, CantidadRegistros} from './../utils/constant'
import Parrafo from './../components/Parrafo'
import Tabla from './../components/Tabla'
import Paginacion from './../components/Paginacion'

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
	{key:'keya', value:0.25, text:0.25},
	{key:'keyb', value:0.5, text:0.5},
	{key:'keyd', value:0.75, text:0.75},
	{key:'keyr', value:1, text:1},
	{key:'keyt', value:1.5, text:1.5},
	{key:'keyy', value:2, text:2},
	{key:'keyu', value:3, text:3},
	{key:'keyi', value:4, text:4},
	{key:'keyo', value:5, text:5},
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
	  	toggleCalorias:true,
	  	responseAlimentos:[{key:-1, value:-1, text:'... seleccione letra ...'}],
	  	responseCalorias:null,
	  	alimentoSeleccion:null,
	  	selectIdAlimento:null,
	  	caloriasValor:null,
	  	selectCalorias:1,
	  	ID:null,
	  	responseData:null,
	  	cargando:true,//bandera para mostrar cargando o la tabla
	  	pagina:1,
	  	totalPages:null
	  };
	}

	handleHojear = async ele => {
		await this.setState({pagina:ele.activePage, cargando:true})
		await this.getData()
		this.setState({cargando:false})

		console.log(ele.activePage)
	}

	cargarAlimentos = async (e, {value}) => {
		this.setState({responseAlimentos:[{key:-1, value:-1, text:'... cargando ...'}]})
		try{
			let formData = new FormData()
			formData.append('buscar', value)
			let response = await fetch(DisplayFood, {method:'post', headers:MyHeaders, body:formData})
			let data = await response.json()
			let array = []
			if(data.length!=0){
				await data.map(async(ele, index) => {
					let obj={}
					 obj.key=await index+'sdf'
					 obj.value=await ele.id
					 obj.text=await ele.nombre
					 array.push(obj)
				})
				await this.setState({responseAlimentos:array, responseCalorias:data})
			}else{
				this.setState({responseAlimentos:[{key:-1, value:-1, text:'... no hay data ...'}]})
			}
			
			console.log(data)
		}catch(error){
			console.log(error)
		}
	}

	seleccionarAlimento = (e, {value}) => {
		console.log(this.state)
		if(value!=-1){
			this.state.responseCalorias.map(ele => {
				if(ele.id==value){
					this.setState({cantidadCalorias:ele.calorias,selectIdAlimento:ele.id, caloriasValor:ele.calorias})
				}
			})
		}
	}

	cambiarCalorias =  (e, {value}) => {
		console.log(value)
		 this.setState({selectCalorias:value,cantidadCalorias:(this.state.caloriasValor*value).toFixed(1)})

	}

	agregarCalorias = async () => {
		try{	
			this.setState({cargando:true})
			let formData = new FormData()
			formData.append('user_id', this.state.ID)
			formData.append('alimento_id', this.state.selectIdAlimento)
			formData.append('cantidad', this.state.selectCalorias)
			let response2 = await fetch(SaveCalorias, {method:'post', headers:MyHeaders, body:formData})
			let data2= await response2.json()
			this.setState({ cargando:false})
			this.getData()
			console.log(data2);
			//console.log('userid:',id, 'alimentoid:', this.state.selectIdAlimento, 'cantidad', this.state.selectCalorias)
		}catch(error){
			console.log(error)
		}
	}

	getData = async() => {
		this.setState({cargando:true})
		try{
			const formData = new FormData()
			formData.append('id', this.state.ID)
			formData.append('cantidadRegistros', CantidadRegistros)
			formData.append('pagina', this.state.pagina)
			let response = await fetch(ShowCalorias, {method:'post', headers:MyHeaders, body:formData})
			let data = await response.json()
			console.log(data)
			this.setState({responseData:data.data, cargando:false, totalPages:(data.cantidad.cantidad/CantidadRegistros)})
			console.log(data)
		}catch(error){
			console.log(error)
		}
	}

	async componentDidMount(){
		this.setState({animacion:true})
		try{
			let response = await fetch(MeApi, {method:'post', headers:MyHeaders})
			let data = await response.json()
			let id = await data.id
			console.log(id)
			await this.setState({ID:id})
			this.getData()
		}catch(error){
			console.log(error)
		}
	}

	handleEliminar = async ele => {
		console.log(ele.id)
		try{
			let formData = new FormData()
			formData.append('id', ele.id)
			await fetch(DeleteCalorias, {method:'post', headers:MyHeaders, body:formData})
			await this.getData()
		}catch(error){
			console.log(error)
		}
	}

	handleBuscar = async () => {
		if(this.state.selectIdAlimento){
			this.setState({cargando:true})
			try{
				let formData = new FormData()
				formData.append('id', this.state.selectIdAlimento)
				formData.append('user_id', this.state.ID)
				let response = await fetch(FindCalorias, {method:'post', headers:MyHeaders, body:formData})
				let data = await response.json()
				await this.setState({responseData:data, cargando:false})
				this.cargarData()
			}catch(error){
				console.log(error)
			}
		}else{
			console.log('error escoge algo')
		}
	}

	handleBusquedaAvanzada = async () => {
		console.log(this.state)
		let {busqueda} = this.state
		if(busqueda.desde<=busqueda.hasta){
			try{
				this.setState({cargando:true})
				let formData = new FormData()
				formData.append('desde', moment(busqueda.desde).format('YYYY-MM-DD'))
				formData.append('hasta', moment(busqueda.hasta).format('YYYY-MM-DD'))
				formData.append('alimento', this.state.buscarTexto)
				formData.append('calorias', this.state.caloriasInput)
				formData.append('mayormenor', this.state.radio)
				formData.append('id', this.state.ID)
				let response = await fetch(AdvanceCalorias, {method:'post', headers:MyHeaders, body:formData})
				let data = await response.json()
				this.setState({responseData:data, cargando:false})
				console.log(this.state.busqueda)
			}catch(error){
				console.log(error)
			}
		}else {
			console.log('no')
		}
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
		date = moment(date).format('MM/DD/YYYY')
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
				obj.content=`Mayor a ${this.state.caloriasInput} cal`
			}else{
				obj.content=`Menor a ${this.state.caloriasInput} cal`
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
	  	this.getData()
		this.setState({vector:[], botonFecha:'Fecha Inicio', botonTexto:true, desdehasta:true, disableBoton:true,busqueda, radio:true, caloriasInput:'', buscarTexto:'', toggleCalorias:true })
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
									<Select options={abecedario} fluid size={'large'} placeholder='Selecciona una letra' onChange={this.cargarAlimentos}/><Divider hidden />
							    </Col>
							    <Col lg={3}>
							        <Select options={this.state.responseAlimentos} fluid size={'large'} placeholder='Selecciona un Alimento' onChange={this.seleccionarAlimento}/><Divider hidden />
							    </Col>
							    <Col lg={3}>
							    {
							    	toggle?
							        <Select options={cantidadAlimento} fluid placeholder='Cantidad consumida' onChange={this.cambiarCalorias} value={this.state.selectCalorias} />:
							        <Select options={cantidadAlimento} fluid placeholder='Cantidad consumida' disabled/>
							    }<Divider hidden />
							    </Col>
							    <Col lg={3}>
							        <Input size='large'  placeholder='Cantidad Calorias' fluid disabled value={this.state.cantidadCalorias} /><Divider hidden />
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
									<Button color='green' content='Agregar' size='large' fluid style={{marginTop:5}} onClick={this.agregarCalorias}/>:
									<Button color='green' content='Agregar' size='large' fluid style={{marginTop:5}} disabled/>
								}
								</Col>
								<Col sm={3}>
								{
									toggle?
									<Button color='purple' content='Buscar' size='large' fluid style={{marginTop:5}} disabled/>:
									<Button color='purple' content='Buscar' size='large' fluid style={{marginTop:5}} onClick={this.handleBuscar}/>
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
								<Row>
									<Col style={{textAlign:'center'}}>Si no establece fechas, por defecto buscara resultados del dia, si establece fecha de inicio DEBE establecer fecha de termino</Col>
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
										<Button content='Buscar' color='green' style={{width:'150px', height:'40px'}} onClick={this.handleBusquedaAvanzada}/>
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
									<>
										<Parrafo cantidad={CantidadRegistros*2} />
										<Divider hidden /><Divider hidden />
										<Parrafo cantidad={3} />
									</>
								    :
								    <>
									    <Tabla 
									    	data={this.state.responseData}
									    	headers={['Fecha', 'Cantidad', 'Alimento', 'Calorias']}
									    	json={['fecha', 'cant', 'nombre', 'cantidad']}
									    	eliminar={this.handleEliminar}
									    	botones={true}
									    	btnEditar={false}
									    	btnEliminar={true}
									    	/>
									    <Paginacion 
									    	totalPages={this.state.totalPages}
									    	default={this.state.pagina}
									    	Hojear={this.handleHojear}
									    />
							    	</>

								   
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
						        </Modal> 
					        : null
					        
						}
						<Footer />
					</Container>
				</Transition>
			</div>
		)
	}
}