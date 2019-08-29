import React, {Component} from 'react'
import Headers from './../components/Headers'
import {Redirect} from 'react-router-dom'
import {Hash, Role} from './../utils/constant'

export default class Alimentos extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	r:'',
	  	response:true
	  };
	  
	}

	componentDidMount(){
		
		if(localStorage.getItem(Role)===Hash && localStorage.getItem(Role)!=null){
			console.log(localStorage.getItem(Role))
			this.setState({r:localStorage.getItem(Role), response:false})
		}else{
			this.setState({response:false})
		}
	}

	render(){
		let accion 
		if(this.state.response){
			accion=null
		}else{
			if(this.state.r===Hash){
				accion=null
			}else{
				accion=<Redirect to='/' />
			}
		}
		return(
			<>
				<Headers />
				{
					accion	
				}
			</>
		)
	}
}