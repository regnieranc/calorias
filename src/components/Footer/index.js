import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Icon } from 'semantic-ui-react'

export default class index extends React.Component{
	render(){
		return(
			<div>
				<Row style={{textAlign:'center', padding:'50px 10px', marginTop:20}}>
					<Col sm={12} style={{marginBottom:10}} md={4}>
						<Button color='linkedin' size='large' fluid>
					        <Icon name='linkedin' /> Regnier Neira
					    </Button>
					</Col>
					<Col sm={12} style={{marginBottom:10}} md={4}>
						<a href='https://regnierneira.com' target='_blank'>
							<Button color='purple' size='large' fluid> <Icon name='code' />Regnier Neira </Button>
						</a>
					</Col>
					<Col sm={12} style={{marginBottom:10}} md={4}>
						<Button color='facebook' size='large' fluid>
					        <Icon name='facebook' /> Regnier Neira
					    </Button>
					</Col>
				</Row>
			</div>
		)
	}
}