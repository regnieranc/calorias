import React from 'react'
import {Paragraph, Placeholder} from 'semantic-ui-react'

const index = (props) => {
	let parrafo =[]
	for(var c=0;c<props.cantidad;c++){
		parrafo.push(<Placeholder.Line key={c} />)
	}
	return(
		<Placeholder fluid style={{borderRadius: '4px', backgroundColor: '#a333c8'}}>
			<Placeholder.Paragraph>
				 {parrafo}
		    </Placeholder.Paragraph>
		</Placeholder>
	)
}

export default index