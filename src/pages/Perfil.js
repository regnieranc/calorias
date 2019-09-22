import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion, Token} from './../utils/constant'
import {Transition, Header, Card, Divider} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'
import Footer from './../components/Footer'
import {MisCalorias, MeApi, UltimasCalorias} from './../utils/api'
import {MyHeaders} from './../utils/constant'
import moment from 'moment'
import CountUp from 'react-countup';
import './styles.css'
import Tabla from './../components/Tabla'
import Parrafo from './../components/Parrafo'
import PieChart from './../components/charts/Pie'
import LineChart from './../components/charts/Line'
import Top from './../components/Top'

export default class Perfil extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	animacion:false,
	  	ID:null,
	  	totalCalorias:0,
	  	imc:0,
	  	ultimo:{
	  		fecha:'..  ..',
	  		nombre:'..  ..',
	  		calorias:0,
	  		cantidad:0
	  	},
	  	cargando:true,
	  	chartpie:{
	  		labels:[],
	  		data:[]
	  	},
	  	responseCalorias:null,
	  	responsePeso:null,
	  	responseLineChart:null
	  };
	}

	async componentDidMount(){
		this.setState({animacion:true})
		try{
			let response = await fetch(MeApi, {method:'post', headers:MyHeaders})
			let data = await response.json()
			let id = await data.id
			await this.setState({ID:id})
			const body = new FormData()
			body.append('hoy', moment(new Date()).format('YYYY-MM-DD'))
			body.append('id', this.state.ID)
			let response2 = await fetch(MisCalorias, {method:'post', headers:MyHeaders, body})
			let data2 = await response2.json()
			console.log(data2[2])
			let ultimo=data2[2]
			let chartpie={}
			chartpie.labels=[]
			chartpie.data=[]
			await data2[3].map(ele => {
				chartpie.labels.push(ele.cantidad+" "+ele.nombre)
				chartpie.data.push([ele.cantidad+" "+ele.nombre, ele.total])
			})
			let response3=await fetch(UltimasCalorias, {method:'post', headers:MyHeaders, body})
			let json = await response3.json()
			console.log(data2)
			let aux=[]
			json.historial.map(ele => {
				console.log(ele)
				aux.push([ele.fecha, ele.calorias])
			})
			await this.setState({totalCalorias:data2[0].total, imc:data2[1].imc, ultimo, cargando:false, chartpie, responseCalorias:json.ultimascalorias,responsePeso:json.peso, responseLineChart:aux})
		}catch(error){
			console.log(error)
		}
	}

	render(){
		return (
			<>	
				<Top />
				<Headers />
				{
					localStorage.getItem(Token)?
					   null  :<Redirect to='/' />
				}
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
						<Row>
							<Col md={4} style={{textAlign:'center', marginBottom: '10px'}}>
							{
								this.state.cargando?
								<Parrafo cantidad={7} /> :
								<Card style={{backgroundColor: '#a333c8' ,color:'white', width: '100%'}}>
						    		<Card.Header style={{paddingTop: '10px', paddingBottom:'10px', fontSize: 16 }}>
						    			 {this.state.ultimo.fecha}
						    		</Card.Header>
								    <Card.Content style={{height:'60px', marginBottom:'10px'}}>
								    	<Header size='medium' style={{color:'white'}}>
								    		{this.state.ultimo.cantidad+" "+this.state.ultimo.nombre} :    
								    		<CountUp 
												end={this.state.ultimo.calorias}	
											 /> cal.
								    	</Header>
									</Card.Content>
								</Card>
							}
							
								
						    </Col>
						    <Col md={4} style={{textAlign:'center', marginBottom: '10px'}}>
						    {
						    	this.state.cargando?
								<Parrafo cantidad={7} /> :
								<Card style={{backgroundColor: '#a333c8' ,color:'white', width: '100%'}}>
						    		<Card.Header style={{paddingTop: '10px', paddingBottom:'10px', fontSize: 16 }}>
						    			 Tu IMC actual
						    		</Card.Header>
								    <Card.Content style={{height:'60px', marginBottom:'10px'}}>
								    	<Header size='huge' 
						        		color={this.state.imc<18.5? 'blue' : 
						        			   this.state.imc<24.9? 'yellow':
						        			   this.state.imc<29.9? 'orange':'red'}>
											<CountUp 
												end={this.state.imc}
												decimals={1}	
											 /> 
										</Header>
									</Card.Content>
								</Card>
						    }
						   		
						    </Col>
						    <Col md={4} style={{textAlign:'center', marginBottom: '10px'}}>
						    {
						    	this.state.cargando?
								<Parrafo cantidad={7} /> :
								<Card style={{backgroundColor: '#a333c8' ,color:'white', width: '100%'}}>
						    		<Card.Header style={{paddingTop: '10px', paddingBottom:'10px', fontSize: 16 }}>
						    			 Tus calorias de hoy
						    		</Card.Header>
								    <Card.Content style={{height:'60px', marginBottom:'10px'}}>
								    	<Header size='huge' 
						        				color={this.state.totalCalorias<1000? 'green' : 
								        			   this.state.totalCalorias<1500? 'yellow':
								        			   this.state.totalCalorias<1800? 'orange':'red'}>
											<CountUp 
												end={this.state.totalCalorias?this.state.totalCalorias:0}
												decimals={1}	
											 /> cal
										</Header>
									</Card.Content>
								</Card>
						    }
						    	

						    </Col>
						</Row><Divider hidden />
						<Row>
							<Col lg={6}>
							{
								this.state.responseCalorias?
								<Tabla
										data={this.state.responseCalorias}
										json={['fecha', 'calorias']}
										headers={['Fecha', 'Calorias']} 
										botones={false}
									/>	:
								<Parrafo cantidad={12} /> 
							}
								<Divider hidden />					

							{
								this.state.responsePeso?
								<Tabla
										data={this.state.responsePeso}
										json={['fecha', 'peso', 'imc']}
										headers={['Fecha', 'Peso', 'Imc']} 
										botones={false}
									/>	:
								<Parrafo cantidad={12} />
							}<Divider hidden />
							</Col>

							<Col lg={6}>
								{
									this.state.cargando?
									<Parrafo cantidad={12} /> :
									<PieChart
										data={this.state.chartpie}
										title='Aporte calorico alimentos consumidos en el dia'
									/>
								}

								{
									this.state.cargando?
									<Parrafo cantidad={12} /> :
									<LineChart
										data={this.state.responseLineChart}
										title='Consumo total de calorias por dia'
									/>
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