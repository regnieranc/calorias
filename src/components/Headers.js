import React from 'react'
import { Visible, Container, Row } from 'react-grid-system';
import Header from './Header/Header'
import HeaderMovil from './HeaderMovil/HeaderMovil'

const Headers = () => {
	return(
			<>
				<Container>
					<Visible lg xl md>
						<Header />
					</Visible>
				</Container>	
				<Visible xs sm>
					<HeaderMovil />
				</Visible>
			</>
		)
}

export default Headers
