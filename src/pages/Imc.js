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
	  	cargando:false
	  };
	}

	componentDidMount(){
		this.setState({animacion:true})
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
	
	handleImc = () => {
		//hacer un checkeo rapido y mandar a la api
		this.setState({peso:'',altura:'',colorImc:'blue',imc:0})
	}

	render(){
		return(
			<div>
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
									            <Table.HeaderCell>Peso</Table.HeaderCell>
									            <Table.HeaderCell>Altura</Table.HeaderCell>
									            <Table.HeaderCell>Imc</Table.HeaderCell>	
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
						<Footer />
					</Container>
				</Transition>
			</div>
		)
	}
}