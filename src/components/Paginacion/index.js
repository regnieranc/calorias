import React from 'react'
import { Pagination, Icon } from 'semantic-ui-react'

export default class index extends React.Component{
	render(){
		return(
			<div style={{textAlign:'center', marginTop:'40px'}}>
				<Pagination
				    defaultActivePage={this.props.default}
				    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
				    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
				    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
				    prevItem={{ content: <Icon name='angle left' />, icon: true }}
				    nextItem={{ content: <Icon name='angle right' />, icon: true }}
				    totalPages={this.props.totalPages}
				    style={{backgroundColor: '#8b2baa'}}
				    onPageChange={(e, data) => this.props.Hojear(data)}
				  />
			</div>
		)
	}
}