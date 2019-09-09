import React from 'react'
import ReactApexCharts from 'react-apexcharts'

export default class index extends React.Component{
	constructor(props) {
        super(props);

        this.state = {
          options: {
          	chart:{
          		animations: {
        		enabled: true,
        		easing: 'easeinout',
        		speed: 800,
        		animateGradually: {
            		enabled: true,
            		delay: 150
        		},
		        dynamicAnimation: {
		            enabled: true,
		            speed: 350
		        }
		    }
          	},
            labels: this.props.data.labels,
            responsive: [{
              breakpoint: 300,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
          series: this.props.data.data
        }
      }


	render(){
		return(
			<>
				<ReactApexCharts options={this.state.options} series={this.state.series} type="pie" width="100%" style={{backgroundColor:'#a333c8', borderRadius: 4}}/>
			</>
		) 
	}
}