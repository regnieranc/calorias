import React, {useState, useEffect} from 'react'
import {Icon, Transition} from 'semantic-ui-react' 

const styles={
	position: 'fixed',
	padding: 20,
	bottom:20,
	right:20,
	backgroundColor: '#6c757d73',
	zIndex: 999,
	borderRadius: 4,
	cursor: 'pointer'
}

const Index = (props) => {
	const [animacion, setAnimacion] = useState(false)

	useEffect(() => {
		setAnimacion(!animacion)
	}, [])

	return(
		<Transition animation={'jiggle'} duration={3000} visible={animacion}>
			<div style={styles} onClick={() => {
				window.scroll({
				  	top: 0,
				  	left: 0,
				  	behavior: 'smooth'
				});
			}}>
				<Icon style={{padding: 0, margin:0}} size='big' name='angle up'/>
			</div>
		</Transition>
	)
}

export default Index