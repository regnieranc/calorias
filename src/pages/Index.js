import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import { Visible, Container, Row, Col } from 'react-grid-system';
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition, Image,List, Table} from 'semantic-ui-react'
import Footer from './../components/Footer'
import Calorias from './../images/calorias.jpg'
import Top from './../components/Top'

export default class Index extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	animacion:false,
	  	animacion2:false
	  };
	}

	componentDidMount(){
		this.setState({animacion:true, animacion2:true})

	}

	render(){
		return(
			<>
			<Top />
			<div>
				<Headers />
			</div>
			<div>
				
					<Container className='content'>
					<Row>
						<Col style={{textAlign:'center'}}>	
							<Transition visible={this.state.animacion2} animation='fly right' duration={1000}>
								<div><h1>¿Qué son las calorías?</h1>	
								<p style={{marginBottom:50, marginTop:40}}>
									Las calorías son la cantidad de calor necesaria para elevar la temperatura de un gramo de agua pura 
									un grado centígrado a una presión de una atmósfera.En nuestro día a día necesitamos un aporte continuo de 
									energía para poder llevar a cabo todas nuestras funciones: para el buen funcionamiento del corazón, del sistema 
									ervioso, para realizar el trabajo muscular, para desarrollar una actividad física, para los procesos biosintéticos
									relacionados con el crecimiento para desarrollar una actividad física, para la reproducción y reparación de tejidos
								 	y también para mantener la temperatura corporal.
								</p></div>
							</Transition>
							<Transition visible={this.state.animacion} animation='fly left' duration={1000}>
								<Image src={Calorias} size='massive' centered rounded />
							</Transition>
						</Col>
					</Row>
						<Row>
							<Col >
								
								<h2 style={{marginTop:60, marginBottom:60}}>¿De dónde procede la energía?</h2>
								<p>
									La energía que necesitamos para poder llevar a cabo estas funciones es suministrada por los alimentos que comemos y 
									se obtiene de la oxidación de hidratos de carbono, grasas y proteínas.
									Denominamos valor energético o calórico de un alimento a la cantidad de energía que se produce cuando es totalmente 
									oxidado o metabolizado para producir dióxido de carbono y agua.
									Todos los alimentos son potenciales administradores de energía pero en cantidades diferentes según su variable contenido 
									de macronutrientes.
									El valor energético de un alimento lo expresamos normalmente en kilocalorías (kcal). Aunque debemos distinguir entre kilocalorías 
									y calorías. Aunque en el campo de la nutrición con frecuencia se utilizan como sinónimos.
									En la actualidad existe una creciente tendencia a utilizar la unidad kilojulio (kj) en lugar de kilocaloría.
									Cuatro son los elementos que pueden nutrir nuestro cuerpo de energía, pero de éstos, solo tres de ellos nos aportan nutrientes, 
									on los carbohidratos, las proteínas y las grasas. El cuarto elemento sería el alcohol, pero éste no nos aporta ningún nutriente, 
									sino energía en la forma de calorías propiamente dicha.<br/><br/><br/>
									La cantidad de energía que aporta cada uno de esto elementos son:</p>
									<List bulleted style={{marginTop:40}}>
										<List.Item><p>Hidratos de Carbono = 4 kilocalorías por gramo.</p></List.Item>
										<List.Item><p>Proteínas = 4 kilocalorías por gramo.</p></List.Item>
										<List.Item><p>Grasas = 9 kilocalorías por gramo.</p></List.Item>
										<List.Item><p>Alcohol = 7 kilocalorías por gramo.</p></List.Item>
									</List>
								
								<h2 style={{marginTop:60, marginBottom:60}}>¿Qué cantidad de calorías debemos consumir al día?</h2>
						    	<p>
						    		Es importante saber que la necesidad energética diaria de una persona varía y está condicionada por su gasto energético total. Éste es la suma de 
						    		su metabolismo basal, el efecto termogénico de los alimentos, el trabajo muscular y el factor de lesión.
						    	</p>
						    	<List style={{marginTop:40}}>
						    		<List.Item>
						    			<p><b>Metabolismo basal:</b> Se trata del consumo energético necesario para mantener las funciones y la temperatura corporal del organismo. Este valor se 
						    			vería afectado por otros factores como la superficie corporal, la masa magra, el sexo, la edad, si ha estado embarazada y el número de embarazos que ha 
						    			tenido, la raza, el clima, si tiene alteraciones hormonales, o los estados nutricionales entre otros factores.</p><br/>
						    		</List.Item>
						    		<List.Item>
						    			<p><b>Efecto termogénico:</b> En este caso el efecto termogénico de los alimentos es el consumo energético que aparece como consecuencia de la digestión de 
						    			los propios alimentos.</p><br/>
						    		</List.Item>
						    		<List.Item>
						    			<p><b>Factor de actividad:</b> Es el gasto energético necesario para el desarrollo de las diferentes actividades. En una persona moderadamente activa representa entre 
						    			el 15 al 30 por ciento de las necesidades totales de la energía.</p><br/>
						    		</List.Item>
						    		<List.Item>
						    			<p><b>Factor de lesión:</b> Aquí se trata de la energía adicional utilizada por el organismo para tratar enfermedades o problemas. Este factor varía dependiendo del 
						    			grado de gravedad, la extensión o la duración del proceso patológico de salud.</p><br/>
						    		</List.Item>
						    	</List>
						    	<h2 style={{marginBottom:60}}>Tabla de calorias diarias recomendadas</h2>
						    	<Table celled inverted color='purple' selectable style={{textAlign:'center'}}>
							    	<Table.Header>
							     		<Table.Row>
							     			<Table.HeaderCell>Sexo</Table.HeaderCell>
							        		<Table.HeaderCell>Edad</Table.HeaderCell>
							        		<Table.HeaderCell>Sedentario</Table.HeaderCell>
							        		<Table.HeaderCell>Actividad Moderada</Table.HeaderCell>
							        		<Table.HeaderCell>Activo</Table.HeaderCell>
							      		</Table.Row>
							    	</Table.Header>
							    	<Table.Body>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>2 - 3</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>4 - 8</Table.Cell>
							    			<Table.Cell>1200 - 1400</Table.Cell>
							    			<Table.Cell>1400 - 1600</Table.Cell>
							    			<Table.Cell>1600 - 2000</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>9 - 13</Table.Cell>
							    			<Table.Cell>1600 - 2000</Table.Cell>
							    			<Table.Cell>1800 - 2200</Table.Cell>
							    			<Table.Cell>2000 - 2600</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell>Hombre</Table.Cell>
							    			<Table.Cell>14 - 18</Table.Cell>
							    			<Table.Cell>2000 - 2400</Table.Cell>
							    			<Table.Cell>2400 - 2800</Table.Cell>
							    			<Table.Cell>2800 - 3200</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>19 - 30</Table.Cell>
							    			<Table.Cell>2400 - 2600</Table.Cell>
							    			<Table.Cell>2600 - 2800</Table.Cell>
							    			<Table.Cell>3000</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>31 - 50</Table.Cell>
							    			<Table.Cell>2200 - 2400</Table.Cell>
							    			<Table.Cell>2400 - 2600</Table.Cell>
							    			<Table.Cell>2800 - 3000</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>50+</Table.Cell>
							    			<Table.Cell>2000 - 2200</Table.Cell>
							    			<Table.Cell>2200 - 2400</Table.Cell>
							    			<Table.Cell>2400 - 2800</Table.Cell>
							    		</Table.Row>
							    	</Table.Body>

							    	<Table.Header>
							     		<Table.Row>
							     			<Table.HeaderCell>Sexo</Table.HeaderCell>
							        		<Table.HeaderCell>Edad</Table.HeaderCell>
							        		<Table.HeaderCell>Sedentario</Table.HeaderCell>
							        		<Table.HeaderCell>Actividad Moderada</Table.HeaderCell>
							        		<Table.HeaderCell>Activo</Table.HeaderCell>
							      		</Table.Row>
							    	</Table.Header>
							    	<Table.Body>

							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>2 - 3</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    			<Table.Cell>1000</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>4 - 8</Table.Cell>
							    			<Table.Cell>1200 - 1400</Table.Cell>
							    			<Table.Cell>1400 - 1600</Table.Cell>
							    			<Table.Cell>1400 - 1800</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>9 - 13</Table.Cell>
							    			<Table.Cell>1400 - 1600</Table.Cell>
							    			<Table.Cell>1600 - 2000</Table.Cell>
							    			<Table.Cell>1800 - 2200</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell>Mujer</Table.Cell>
							    			<Table.Cell>14 - 18</Table.Cell>
							    			<Table.Cell>1800</Table.Cell>
							    			<Table.Cell>2000</Table.Cell>
							    			<Table.Cell>2400</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>19 - 30</Table.Cell>
							    			<Table.Cell>1800 - 2000</Table.Cell>
							    			<Table.Cell>2000 - 2200</Table.Cell>
							    			<Table.Cell>2400</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>31 - 50</Table.Cell>
							    			<Table.Cell>1800</Table.Cell>
							    			<Table.Cell>2000</Table.Cell>
							    			<Table.Cell>2200</Table.Cell>
							    		</Table.Row>
							    		<Table.Row>
							    			<Table.Cell/>
							    			<Table.Cell>50+</Table.Cell>
							    			<Table.Cell>1600</Table.Cell>
							    			<Table.Cell>1800</Table.Cell>
							    			<Table.Cell>2000 - 2200</Table.Cell>
							    		</Table.Row>
							    	</Table.Body>
							    </Table>
						    </Col>
						</Row>
				
						<Footer />	
					</Container>
				
			</div>
			</>
		)
	}
}