import React from 'react'
import Headers from './../components/Headers'
import Footer from './../components/Footer'
import {Transition} from 'semantic-ui-react'
import {Container} from 'react-grid-system'

export default class Page404 extends React.Component{
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
			<Container>
				<Headers />
				<Transition visible={this.state.animacion} animation='fly right' duration={700}>
				<>	<div style={{textAlign:'center', height:'40vh', marginTop:'20%'}}>
						<h1>Pagina no encontrada</h1>
					</div>
					<Footer /></>
				</Transition>
				
			</Container>
		)
	}
	
}

