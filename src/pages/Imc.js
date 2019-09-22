import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion, Token} from './../utils/constant'
import {Redirect} from 'react-router-dom'
import {Transition, Divider, Input, Label, Popup, Button, Table, Placeholder} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'
import Footer from './../components/Footer'
import validator from 'validator';
import { MeApi, ShowImc, SaveImc, DeleteImc} from './../utils/api'
import {MyHeaders, CantidadRegistros} from './../utils/constant'
import Parrafo from './../components/Parrafo'
import Tabla from './../components/Tabla'
import Paginacion from './../components/Paginacion'
import Top from './../components/Top'

const estilos = {
	width:'100%', textAlign:'center', margin:'2px', fontWeight:'normal', cursor:'pointer', marginTop:'5px'
}
export default class Imc extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	animacion:false,
	  	peso:'',
	  	altura:'',
	  	colorImc:'blue',
	  	imc:0,
	  	modal:false,
	  	cargando:true,
	  	ID:null,
	  	responseData:null,
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

	async componentDidMount(){
		this.setState({animacion:true})
		try{
			let response = await fetch(MeApi, {method:'post', headers:MyHeaders})
			let data = await response.json()
			let id = await data.id
			await this.setState({ID:id})
			
			await this.getData()
			this.setState({cargando:false})
		}catch(error){
			console.log(error)
		}
	}

	getData = async () => {
		try{
			let body = new FormData()
			body.append('id', this.state.ID)
			body.append('cantidadRegistros', CantidadRegistros)
			body.append('pagina', this.state.pagina)
			let response = await fetch(ShowImc,{method:'post', headers:MyHeaders, body})
			let data = await response.json()
			console.log(data)
			this.setState({responseData:data.data, totalPages:Math.ceil(data.cantidad.cantidad/CantidadRegistros)})
		}catch(error){
			console.log(error)
		}
	}

	actualizarDatos = async (e, valor) => {
		let numero = e.target.value
		console.log(numero)
		if(numero==''){
			numero=0
			if(valor==1) this.setState({altura:'', imc:0})
			else this.setState({ peso:'', imc:0})
			
			return
		}
		if(validator.isNumeric(numero, {no_symbols: true})){
			if(valor==1 && validator.isInt(numero) && numero<=300){
				await this.setState({altura:numero})
			}
			if(valor==0 && numero<=300){
				await this.setState({peso:numero})
			}
			if(this.state.altura!=0){
				let imc=((this.state.peso/((Math.pow(this.state.altura, 2))))*10000).toFixed(1)
				await this.setState({imc})
				let colorImc=''
				if(this.state.imc<=18.5){
					colorImc='blue'
				}else if(this.state.imc>18.5 && this.state.imc<=24.9){
					colorImc='green'
				}else if(this.state.imc>24.9 && this.state.imc<=29.9){
					colorImc='orange'
				}else{
					colorImc='red'
				}
				this.setState({colorImc})
			}
		}
	}
	
	handleImc = async () => {
		//hacer un checkeo rapido y mandar a la api
		const {altura, peso} =this.state
		if(this.state.ID && altura && peso){
			this.setState({cargando:true})
			let body = new FormData()
			body.append('altura', altura)
			body.append('peso', peso)
			body.append('id', this.state.ID)
			let response = await fetch(SaveImc, {method:'post', headers:MyHeaders, body})
			let data = await response.json()
			console.log(data)
			
			await this.getData()
			this.setState({cargando:false})
		}else{
			console.log('no')
		}
		console.log(this.state)
		this.setState({peso:'',altura:'',colorImc:'blue',imc:0})
	}

	handleEliminar = async ele => {
		this.setState({cargando:true})
		try{
			let body = new FormData()
			body.append('id', ele.id)
			await fetch(DeleteImc, {method:'post', headers:MyHeaders, body})
			await this.getData()
			this.setState({cargando:false})
		}catch(error){
			console.log(error)
		}
	}

	render(){
		return(
			<div>
			<Top />	
			{
				localStorage.getItem(Token)?
					   null  :<Redirect to='/' />
			}
				<Headers />
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
				    	<Row>
				    		<Col>
				    			<p>En esta seccion podras ingresar tu estatura y tu peso, asi el sistema validara los datos ingresados
				    			y los registrara, para que de esta forma en la seccion 'Mi perfil' puedas seguir tu avance y estadisticas de tu proceso</p>
				    		
				    		</Col>
				    	</Row><Divider hidden /><Divider hidden />
						<Row>
							<Col md={3}>
								<Input type='number' placeholder='Ingresa tu estatura' fluid size='large' value={this.state.altura} onChange={e => this.actualizarDatos(e, 1)}/><Divider hidden />
						    </Col>
						    <Col md={3}>
						        <Input type='number' placeholder='Ingresa tu peso' fluid size='large' value={this.state.peso} onChange={e => this.actualizarDatos(e, 0)}/><Divider hidden />
						    </Col>
						    <Col md={3} style={{boxSizing:'border-box'}}>
						    	<Row>
						    		<Label content={`Tu IMC es ${this.state.imc}`} style={{textAlign:'center', width: '100%', marginRight:'15px', marginLeft:'15px'}} color={this.state.colorImc} size='huge'/><Divider hidden />
						    	</Row>
						        <Row>
						        	<Col xs={6}>
						        		<Popup 
						        			header='IMC menor a 18.5' 
						        			inverted  position='bottom center'
						        			trigger={<Label content='Bajo Peso' 
						        							color='blue' 
						        							style={estilos}
						        					/>
						        				}
						        		/>
						        	</Col>
						        	<Col xs={6}>
						        		<Popup 
						        			header='IMC entre 18.6 y 24.9' 
						        			inverted  position='bottom center'
						        			trigger={<Label content='Normal' 
						        							color='green' 
						        							style={estilos}
						        						/>
						        					}
						        		/>
						        	</Col>
						        </Row>
						        <Row>
						        	<Col xs={6}>
						        		<Popup 
						        			header='IMC entre 25 y 29.9' 
						        			inverted  position='bottom center'
						        			trigger={<Label content='Sobrepeso' 
						        							color='orange' 
						        							style={estilos}
						        							/>
						        						}
						        			/>
						        	</Col>
						        	<Col xs={6}>
						        		<Popup 
						        			header='IMC mayor a 30' 
						        			inverted  position='bottom center'
						        			trigger={<Label content='Obeso' 
						        							color='red' 
						        							style={estilos}
						        							/>
						        						}
						        			/>
						        	</Col>
						        </Row><Divider hidden />
						    </Col>
						    <Col md={3}>
						        <Row>
						        	<Col xs={12}>
						        		<Button content='Agregar' color='green' fluid onClick={this.handleImc}/>
						        	</Col>
						        	<Col xs={12}>
						        		<Button content='Limpiar' color='red'  fluid  style={{marginTop:'10px'}}
						        			onClick={() => {
						        				this.setState({peso:'',altura:'',colorImc:'blue',imc:0})
						        			}}
						        		/>
						        	</Col>
						        </Row>
						    </Col>
						</Row>
						<Row>
							<Col xs={12}>
							    <Divider hidden /><Divider hidden />
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
									    	headers={['Fecha', 'Peso', 'Altura', 'Imc']}
									    	json={['fecha', 'peso', 'altura', 'imc']}
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
						<Footer />
					</Container>
				</Transition>
			</div>
		)
	}
}