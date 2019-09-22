import React from 'react'
import AnyChart from 'anychart-react'

export default class index extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
		console.log(this.props)
	}
	render(){
		return (
			<div>
				<AnyChart
	                type="line"
	                data={this.props.data}
	                title={this.props.title}
	                height= {300}
	            />
	            </div>
		)
	}
}