import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion, Token} from './../utils/constant'
import {Transition} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'
import Footer from './../components/Footer'

export default class Perfil extends Component{
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
		return (
			<>
				<Headers />
				{
					localStorage.getItem(Token)?
					   null  :<Redirect to='/' />
				}
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
				    <Container className='content'>
						<Row>
							<Col sm={3} debug>
								One of three columns
						    </Col>
						    <Col sm={3} debug>
						        One of three columns
						    </Col>
						    <Col sm={3} debug>
						        One of three columns
						    </Col>
						    <Col sm={3} debug>
						        One of three columns
						    </Col>
						</Row>
						<Footer />
					</Container>
				</Transition>
			</>

		)
	}
}