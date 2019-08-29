import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Headers from './../components/Headers'

export default class Perfil extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	login:false
	  };
	}

	conponentDidMount(){
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
			</>

		)
	}
}