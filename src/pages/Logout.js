import React from 'react'
import {LogoutApi} from './../utils/api'
import {Redirect} from 'react-router-dom'
import {Dimmer, Loader} from 'semantic-ui-react'
import {Role} from './../utils/constant'

export default class Logout extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	logout:false
	  };
	}

	componentDidMount(){
		const token = localStorage.getItem('token')
		if(token){
			const myHeaders = new Headers();
			myHeaders.append('Accept', 'application/json');
			myHeaders.append('Authorization', `Bearer ${token}`);
			fetch(LogoutApi, {method:'post',headers: myHeaders}).then(data => data.json())
			.then(data => {
				console.log(data)
				this.setState({logout:true})
			})
			localStorage.removeItem('token')
			localStorage.removeItem('name')
			localStorage.removeItem(Role)
		}else{
			this.setState({logout:true})
		}
		
	}

	render(){
		const {estado} = this.state
		return(
			<>
				{
					!this.state.logout?
					<Dimmer active><Loader>Loading</Loader></Dimmer> :  <Redirect to='/'/ >
				}
				
			
			</>
		)
	}
}