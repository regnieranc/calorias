import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Headers from './../components/Headers'
import {AnimacionForm, TiempoAnimacion} from './../utils/constant'
import {Transition} from 'semantic-ui-react'
import {Row, Col, Container} from 'react-grid-system'

export default class Perfil extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	login:false,
	  	animacion:false
	  };
	}

	componentDidMount(){
		this.setState({animacion:true})
		if(localStorage.token){
			this.setState({login:true})
		}
	}

	render(){
		return (
			<>
				<Headers />
				{
					this.state.login?
					   <Redirect to='/' /> : null
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
					</Container>
				</Transition>
			</>

		)
	}
}