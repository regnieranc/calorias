import React, {Component} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'
import {Icon, Popup} from 'semantic-ui-react'
import {Hash, Role} from './../../utils/constant'

const style = {
  borderRadius: 5,
  padding: '1em',
  height: '90px',
  textAlign: 'justify',
  verticalAlign: 'top',
}

export default class Header extends Component{
	render(){
		return(
			<div>
				{
					localStorage.name?
					<div  style={{marginTop:'10px', fontSize: '18px'}}><span>Bienvenido, {localStorage.name}</span></div> : null

				}
				<header className={'navbar'}>
					{
						localStorage.getItem('token') ?
						<Link to='/' className={'nav-item'}><Popup position='bottom left' inverted header ='Home' trigger={<Icon name='home' className={'icon'} size='large'/>} /></Link> 
						: <Link to='/' className={'nav-item'}>Home</Link>
					}
					
					{
						localStorage.getItem(Role)==Hash?
						<Link to='/alimentos' className={'nav-item'}><Popup inverted header='Alimentos' content='Aqui puedes registrar alimentos y sus calorias' style={style} trigger={<Icon name='food' className={'icon'} size='large' />} /></Link> : null
					}
					{
						localStorage.getItem('token') ? 
						(
							<>
								<Link to='/calorias' className={'nav-item'}><Popup style={style} position='bottom left' inverted content='Aqui puedes registrar tu consumo de calorias' header='Calorias' trigger={ <Icon name='heartbeat' className={'icon'} size='large'/>} /></Link> 
								<Link to='/imc' className={'nav-item'}><Popup position='bottom center' style={style} inverted content='Aqui puedes registrar tu peso y altura para calcular tu imc' header='Imc' trigger={<Icon name='weight' className={'icon'} size='large'/>} /></Link> 
								<Link to='/perfil' className={'nav-item'}><Popup position='bottom right' style={style} inverted content='Aqui puedes conocer tus estadisticas' header ='Perfil' trigger={<Icon name='user' className={'icon'} size='large' />} /></Link>
								<Link to='/logout' className={'nav-item'}><Popup  position='bottom right' inverted header ='Logout' trigger={<Icon name='log out' className={'icon'} size='large'/>} /></Link> 
									
							</>
						): 
						(
							<>
								<Link to='/login' className={'nav-item'}>Login</Link>
								<Link to='/register' className={'nav-item'}>Register</Link>
							</>
						)
					}
				</header>
			</div>
		)
	}
}