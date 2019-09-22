import React from 'react'
import AnyChart from 'anychart-react'

export default class index extends React.Component{
	constructor(props) {
        super(props);
      }
      
	render(){
		return(
            <div>
    			<AnyChart
                    style={{display: 'inline-block'}}
                    type="pie"
                    data={this.props.data.data}
                    title={this.props.title}
                    height= {300}
                />
            </div>
		) 
	}
}