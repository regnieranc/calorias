import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'

export default class Imc extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	animacion:false
	  };
	}

	componentDidMount(){
		this.setState({animacion:true})
	}
	
	render(){
		return(
			<div>
				<Headers />
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
						<Row>
							<Col sm={4} debug>
								One of three columns
						    </Col>
						    <Col sm={4} debug>
						        One of three columns
						    </Col>
						    <Col sm={4} debug>
						        One of three columns
						    </Col>
						</Row>
					</Container>
				</Transition>
			</div>
		)
	}
}