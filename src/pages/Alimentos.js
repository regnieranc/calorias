import React, {Component} from 'react'
import Headers from './../components/Headers'
import {Redirect} from 'react-router-dom'
import {Hash, Role} from './../utils/constant'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition, Form, Input, Button, Divider, Segment, Checkbox, Placeholder, Table} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'
import Footer from './../components/Footer'
import {ShowFood, SaveFood, DeleteFood, EditFood, FindFood} from './../utils/api'
import {MyHeaders, CantidadRegistros} from './../utils/constant'
import './styles.css'
import Parrafo from './../components/Parrafo'
import Tabla from './../components/Tabla'
import validator from 'validator';
import Paginacion from './../components/Paginacion'
import Top from './../components/Top'

export default class Alimentos extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	r:'',
	  	response:true,
	  	animacion:false,
	  	toggle:true,
	  	cargando:true,
	  	responseAlimentos:null,
	  	nombreAlimento:'',
	  	cantidadCaloria:'',
	  	estadoresponseboton:false,
	  	alimentoEditar:null,
	  	editar:false,
	  	pagina:1,
	  	totalPages:null
	  };
	  
	}

	handleToggle = () => {
		this.setState({toggle:!this.state.toggle})
	}

	handleHojear = async ele => {
		await this.setState({pagina:ele.activePage, cargando:true})
		await this.cargarData()
	}

	 componentDidMount(){
		this.setState({animacion:true})
		if(localStorage.getItem(Role)===Hash && localStorage.getItem(Role)!=null){
			console.log(localStorage.getItem(Role)) 
			this.setState({r:localStorage.getItem(Role), response:false})
		}else{
			this.setState({response:false})
		}
		 this.cargarData()
	}

	cargarData = async () => {
		this.setState({cargando:true})
		try{
			let body = new FormData()
			body.append('cantidadRegistros', CantidadRegistros)
			body.append('pagina', this.state.pagina)
			const datos = await fetch(ShowFood, {method:'post', headers:MyHeaders, body})
			const json =  await datos.json()
			console.log(json)
			if(!json.error){
				await this.setState({responseAlimentos:json.data, cargando:false, totalPages:Math.ceil(json.cantidad.cantidad/CantidadRegistros)})
			}
		}catch(error){
			console.log(error)
		}
	}

	handleEditar = async (ele) => {
		try{
			const formData = new FormData()
			formData.append('id', ele.id)
			formData.append('calorias', ele.calorias)
			formData.append('nombre', ele.nombre)
			let data = await fetch(EditFood, {method:'post', headers:MyHeaders, body:formData})
			let json =await data.json()
			console.log(json)
			
			await this.cargarData()
		}catch(error){
			console.log('error')
		}
		//this.setState({elementoEditar:ele, nombreAlimento:ele.nombre, cantidadCaloria:ele.calorias, editar:true})
	}

	clickEditar = () => {

	}


	handleBuscar = async () => {
		this.setState({cargando:true})
		try{
			const formData=new FormData()
			formData.append('buscar', this.state.nombreAlimento)
			let res = await fetch(FindFood, {method:'post', headers:MyHeaders, body:formData})
			res=await res.json()
			await this.setState({cargando:false, responseAlimentos:res})
			console.log(res)
		}catch(e){
			console.log(e)
		}
		console.log(this.state.nombreAlimento)
	}

	handleEliminar = async (ele) => {
		try{
			const formData = new FormData()
			formData.append('id', ele.id)
			await fetch(DeleteFood, {method:'post', headers:MyHeaders, body:formData})
			await this.cargarData()
		}catch(error){
			console.log(error)
		}
		console.log(ele)
	}

	setCaloria = e => {
		const {value} = e.target
		if(value==''){
			this.setState({ cantidadCaloria:''})
			return
		}
		if(validator.isNumeric(value, {no_symbols: true})){
			this.setState({cantidadCaloria:value})
		}
		console.log(value)
	}

	handleAgregar = async () => {
		this.setState({estadoresponseboton:true})
		try{
			const formData = new FormData()
			formData.append('nombre', this.state.nombreAlimento)
			formData.append('calorias', this.state.cantidadCaloria)
			const datos = await fetch(SaveFood, {method:'post', headers:MyHeaders, body:formData})
			const json = await datos.json()
			if(json.status==1){
				await this.cargarData()
				this.setState({nombreAlimento:'', cantidadCaloria:''})
			}
			this.setState({estadoresponseboton:false})
		}catch(error){
			console.log(error)
			this.setState({estadoresponseboton:false})
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

		return(
			<>
				<Top />
				<Headers />
				{
					accion	
				}


				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
						<Row>
							<Col sm={3} >
								<Form.Field> 
							        <Input size='large' placeholder='Nombre Alimento' fluid value={this.state.nombreAlimento} onChange={e => this.setState({nombreAlimento:e.target.value})}/>
							    </Form.Field><Divider hidden />
						    </Col>
						    <Col sm={3} >
						       <Form.Field> 
						       {
						       		this.state.toggle?
							        	<Input size='large'  type='number' placeholder='Calorias' fluid value={this.state.cantidadCaloria} onChange={e => this.setCaloria(e)}/> :
							        	<Input size='large'  placeholder='Calorias' fluid disabled/>
						       }
							    </Form.Field><Divider hidden />
						    </Col>
						    <Col sm={3}>
						    {
						    	this.state.toggle?
						        <Button size='large'  color='green' content='Agregar' fluid onClick={this.handleAgregar} disabled={!this.state.estadoresponseboton? false:true }/>:
						        <Button size='large'  color='green' content='Agregar' fluid disabled/>
						    }<Divider hidden />
						    </Col>
						    <Col sm={3}>
						        {
						        	this.state.toggle?
						        	<Button color='purple' content='Buscar' size='large' fluid disabled/> :
						        	<Button color='purple' content='Buscar' size='large' fluid onClick={this.handleBuscar}/>
						        } <Divider hidden />
						    </Col>
						</Row>
						<Row>
							<Col sm={3} >
							</Col>
							<Col sm={3}  style={{textAlign:'center'}} >
									<h3>Ingresar </h3>
      								<Checkbox toggle checked={this.state.toggle} onChange={this.handleToggle}/>
							</Col>
							<Col sm={3} style={{textAlign:'center'}} >
      							<h3>Buscar</h3><Checkbox toggle checked={!this.state.toggle} onChange={this.handleToggle}/>
							</Col>
							<Col sm={3} >
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
									    	data={this.state.responseAlimentos}
									    	headers={['Alimento', 'Caloria']}
									    	json={['nombre', 'calorias']}
									    	editar={this.handleEditar}
									    	eliminar={this.handleEliminar}
									    	botones={true}
									    	btnEditar={true}
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
			</>
		)
	}
}