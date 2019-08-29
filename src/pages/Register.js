import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import { Visible, Container, Row, Col } from 'react-grid-system';
import {Form, Grid, Button, Message, Loader, Dimmer, Modal} from 'semantic-ui-react'
import './styles.css'
import Headers from './../components/Headers'
import {RegisterApi} from './../utils/api'
import validator from 'validator';

export default class Register extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email:'',
	  	password:'',
	  	nombre:'',
	  	apellido:'',
	  	passwordConfirm:'',
	  	statusNegative:false,
	  	messageNegative:'',
	  	response:false,
	  	ok:false,

	  };
	}

	handleSubmit = () => {
		this.setState({statusNegative: false, response:true})
		if(this.state.email && this.state.password && this.state.nombre && this.state.apellido && this.state.passwordConfirm){
			if(this.state.password === this.state.passwordConfirm){
				if (!validator.isEmail(this.state.email)) {
					this.setState({response:false})
					this.setState({statusNegative: true, messageNegative: 'El correo no es valido'})
				}else{
					let formData = new FormData()
					formData.append('email', this.state.email)
					formData.append('name', this.state.nombre)
					formData.append('surname', this.state.apellido)
					formData.append('password', this.state.password)
					fetch(RegisterApi, {method:'post', body:formData}).then(res => res.json()).then(data => {
						this.setState({response:false})
						if(data.status==0){//ocurrio error
							console.log(data.mensajes)
							let msj='';
							if(data.mensajes.email) data.mensajes.email.map(ele => msj+=ele+' - ')
							if(data.mensajes.nombre) data.mensajes.nombre.map(ele => msj+=ele+' - ')	
							if(data.mensajes.apellido) data.mensajes.apellido.map(ele => msj+=ele+' - ')	
							if(data.mensajes.password){
								data.mensajes.password.map(ele => msj+=ele+' - ')
								this.setState({password:'', passwordConfirm:''})
							} 
							
							this.setState({messageNegative:msj, statusNegative:true})
						}else if(data.status==-1){
							    let msj=data.mensajes
								this.setState({messageNegative:msj, statusNegative:true})
						}else{
							console.log(data)
							this.setState({email:'', apellido:'', nombre:'', password:'', passwordConfirm:'', ok:true, ok:true})
							
						}
						
					})
				}
				

				
			}else{
				this.setState({response:false})
				this.setState({statusNegative: true, messageNegative: 'Las contraseñas no coinciden', password:'', passwordConfirm:''})
			}
		}else{
			this.setState({statusNegative: true, messageNegative: 'Te faltan datos por rellenar', response:false})
			console.log('faltan datos')
		}
	}

	changeEmail = e => {
		this.setState({email: e.target.value})
	}

	changeNombre = e => {
		this.setState({nombre: e.target.value})
	}

	changeApellido = e => {
		this.setState({apellido: e.target.value})
	}

	changePassword = e => {
		this.setState({password:e.target.value})
	}
	changePasswordConfirm = e => {
		this.setState({passwordConfirm:e.target.value})
	}

	handleClose = () => {
		this.setState({ok:false})
	}

	render(){
		return(
			<div>
				<Headers />
				
				<Container className='content'>
					<Grid centered columns={2}>
						<Grid.Column>
							<Form>
								<Form.Field>
						          	<Form.Input fluid label='Email' placeholder='Email' onChange={this.changeEmail} value={this.state.email}/>
						        </Form.Field>
						        <Form.Field>
						          	<Form.Input fluid label='Nombre' placeholder='Nombre' onChange={this.changeNombre} value={this.state.nombre}/>
						        </Form.Field>
						        <Form.Field>
						          	<Form.Input fluid label='Apellido' placeholder='Apellido' onChange={this.changeApellido} value={this.state.apellido}/>
						        </Form.Field>
						        <Form.Field>
						          	<Form.Input fluid label='Password' placeholder='Password' type='password' onChange={this.changePassword} value={this.state.password}/>
						        </Form.Field>
						        <Form.Field>
						          	<Form.Input fluid label='Confirmar Contraseña' placeholder='Confirmar Password' type='password' onChange={this.changePasswordConfirm} value={this.state.passwordConfirm}/>
						        </Form.Field>
						        {
						        	!this.state.response? 
						        	<Button fluid onClick={this.handleSubmit} style={{marginTop:'50px'}}>Register</Button>
						        	: 
						        	null
						        }
						       
							</Form>
							{
								this.state.statusNegative ? 
								<Message negative>
    								<Message.Header>Error</Message.Header>
   										<p>{this.state.messageNegative}</p>
  									</Message> : null
							}
						</Grid.Column>
					</Grid>
				</Container>
				{
					this.state.response?
					<Dimmer active><Loader size='large'>Loading</Loader></Dimmer> : null
				}
				{
					this.state.ok?
					<Modal size={'mini'} open={this.state.ok}>
  						<Modal.Header>Ya puedes usar la app!!</Modal.Header>
							<Modal.Content>
							<p style={{color:'black'}}>Gracias por registrarte, revisa tu bandeja de correo para confirmar el registro</p>
							</Modal.Content>
							<Modal.Actions>
							<Button positive onClick={this.handleClose}>Ok</Button>
							</Modal.Actions>
					</Modal> : null
		}
			</div>
		)
	}
}