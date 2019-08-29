import React, {Component} from 'react'
import Header from './../components/Header/Header'
import HeaderMovil from './../components/HeaderMovil/HeaderMovil'
import { Visible, Container, Row } from 'react-grid-system';
import './styles.css'
import Headers from './../components/Headers'

export default class Calorias extends Component{
	render(){
		return(
			<div>
				<Headers />
					<span style={{visibility:'hidden'}}>.</span>
				
				<Container className='content'>
					<Row>
					koj
					</Row>
				</Container>
			</div>
		)
	}
}