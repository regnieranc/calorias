import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import { Visible, Container, Row, Col } from 'react-grid-system';
import './styles.css'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition} from 'semantic-ui-react'
import Footer from './../components/Footer'

export default class Index extends Component{
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
			<>
			<div>
				<Headers />
			</div>
			<div>
				<Transition visible={this.state.animacion} animation={AnimacionForm} duration={TiempoAnimacion}>
					<Container className='content'>
						<Row>
							<Col sm={4} debug>
								asdsd
						    </Col>
						    <Col sm={4} debug>
						        asdsd
						    </Col>
						    <Col sm={4} debug>
						        asdsd
						    </Col>
						</Row>
						<Footer />
					</Container>
				</Transition>
			</div>
			</>
		)
	}
}