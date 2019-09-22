import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import { Visible, Container, Row, Col } from 'react-grid-system';
import {Form, Grid, Button, Dimmer, Loader, Message, Modal, Transition} from 'semantic-ui-react'
import './styles.css'
import {Redirect} from 'react-router-dom'
import Headers from './../components/Headers'
import {LoginApi} from './../utils/api'
import {Role, AnimacionForm, TiempoAnimacion, Token, MyHeaders} from './../utils/constant'
import validator from 'validator'
import Footer from './../components/Footer'
import Top from './../components/Top'

export default class Login extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email:'',
	  	password:'',
	  	response:false, 
	  	message:'',
	  	ok:false, 
	  	login:false,
	  	animacion:false
	  };
	}

	handleSubmit =  () => {
		this.setState({response:true})
		console.log('hacer consulta y apagar loader y hacer lo necesario redireccionando');
		if(this.state.email && this.state.password){
			if(!validator.isEmail(this.state.email)){
				this.setState({response:false, message:'El correo no es valido'})
			}else{
				let formData = new FormData()
				formData.append('email', this.state.email)
				formData.append('password', this.state.password)
				fetch(LoginApi, {method:'post', body:formData}).then(data => data.json()).then(data =>{
					if(data.user!=undefined){
						localStorage.setItem(Token, data.access_token)
						localStorage.setItem('name', data.user.name+' '+data.user.surname)
						MyHeaders['Authorization']=`Bearer ${localStorage.getItem(Token)}`
						if(data.user.role){
							localStorage.setItem(Role, data.user.role)
						}
						this.setState({login:true})
					}else{
						this.setState({ok:true, message:'', response:false})
					}
				})
			}
			
		}else{
			this.setState({response:false, message:'Faltan datos por llenar'})
			console.log('faltan daros')
		}
		
		
	}

	changeEmail = e => {
		this.setState({email: e.target.value})
	}

	changePassword = e => {
		this.setState({password:e.target.value})
	}

	handleClose = () => {
		this.setState({ok:false})
	}

	componentDidMount(){
		this.setState({animacion:true})
	}

	render(){
		 const { animacion } = this.state
		return(
			<div>
			<Top />
				<Headers />
				{
					localStorage.getItem(Token)?
					<Redirect to ='/' /> : null
				}
				<Transition visible={animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				<Container className='content-login'>
					<Grid centered columns={2} only='mobile'>
						<Grid.Column>

							
								<Form>
									<h1 style={{textAlign: 'center', marginBottom:20}}>Inicia sesión</h1>
									<Form.Field>
							          	<Form.Input fluid label='Email' placeholder='Email' onChange={this.changeEmail} value={this.state.email}/>
							        </Form.Field>
							        <Form.Field>
							          	<Form.Input fluid label='Password' placeholder='Password' type='password' onChange={this.changePassword} value={this.state.password}/>
							        </Form.Field>
						        {
						        	!this.state.response?
						        	<Button fluid style={{marginTop: '50px'}} onClick={this.handleSubmit}>Login</Button> : null
						        }
						        
								</Form>
								
							{
								this.state.message?
								<Message negative>
									<Message.Header>Error</Message.Header>
									<p>{this.state.message}</p>
								</Message> : null
							}
						</Grid.Column>
					</Grid>
					<Footer />
				</Container></Transition>

				{
					this.state.response?
					<Dimmer active><Loader>Loading</Loader></Dimmer> : null
				}
				
				{
					this.state.ok?
					<Modal size={'mini'} open={this.state.ok}>
  						<Modal.Header style={{textAlign:'center'}}>Acceso no autorizado!!</Modal.Header>
							<Modal.Content  style={{marginTop:0, textAlign:'center', color:'black'}}>
							<p>Los datos no estan correctos</p>
							</Modal.Content>
							<Modal.Actions>
							<Button positive onClick={this.handleClose}>Ok</Button>
							</Modal.Actions>
					</Modal> : null
				}

				{
					this.state.login?
					<Redirect to='/' /> : null
				}
				
			</div>
		)
	}
}