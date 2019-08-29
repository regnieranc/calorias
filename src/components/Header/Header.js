import React, {Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import {Icon, Popup, Transition} from 'semantic-ui-react'
import {Hash, Role} from './../../utils/constant'
import { AnimacionHeader, TiempoAnimacion} from './../../utils/constant'

const style = {
  borderRadius: 5,
  padding: '1em',
  height: '90px',
  textAlign: 'justify',
  verticalAlign: 'top',
}

export default class Header extends Component{
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
		return(<>
			<Transition visible={this.state.animacion} animation={AnimacionHeader} duration={TiempoAnimacion}>
				<header className={'navbar'}>
					{
						localStorage.name?
						<div  style={{marginBottom:'20px', fontSize: '18px', textAlign:'left'}}><span>Bienvenido, {localStorage.name}</span></div> : null

					}
					{
						localStorage.getItem('token') ?
						<Link to='/' className={'nav-item'}><Popup position='bottom left' inverted header ='Home' trigger={<Icon name='home' className={'icon'} size='large'/>} /></Link> 
						: <Link to='/' className={'nav-item'}>Inicio</Link>
					}
					
					{
						localStorage.getItem(Role)==Hash?
						<Link to='/alimentos' className={'nav-item'}><Popup inverted position='bottom left' header='Alimentos' trigger={<Icon name='food' className={'icon'} size='large' />} /></Link> : null
					}
					{
						localStorage.getItem('token') ? 
						(
							<>
								<Link to='/calorias' className={'nav-item'}><Popup position='bottom left' inverted header='Calorias' trigger={ <Icon name='heartbeat' className={'icon'} size='large'/>} /></Link> 
								<Link to='/imc' className={'nav-item'}><Popup position='bottom center' inverted header='Imc' trigger={<Icon name='weight' className={'icon'} size='large'/>} /></Link> 
								<Link to='/perfil' className={'nav-item'}><Popup position='bottom right' inverted header ='Perfil' trigger={<Icon name='user' className={'icon'} size='large' />} /></Link>
								<Link to='/logout' className={'nav-item'}><Popup  position='bottom right' inverted header ='Logout' trigger={<Icon name='log out' className={'icon'} size='large'/>} /></Link> 
									
							</>
						): 
						(
							<>
								<Link to='/login' className={'nav-item'}>Login</Link>
								<Link to='/register' className={'nav-item'}>Registro</Link>
							</>
						)
					}
				</header>
			 </Transition> </>
		)
	}
}