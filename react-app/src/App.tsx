import React from 'react'
import { omit, isEmpty } from 'lodash'
import { Dispatch } from './redux/reducer'

import './css/App.css'

interface Props {
	dispatch: Dispatch
	[k: string]: any
}

const App: React.FC<Props> = props => {
	console.log('[app]', props)

	const handleClick = () => {
		props.dispatch({ type: 'ADD', todo: { id: Math.random(), title: 'new stuff', price: 500 } })
	}

	const cleanProps = omit(props, 'dispatch')

	return (
		<div className="App">
			<header className="App-header">
				<div>trying custom made redux in action</div>
				<div>
					{!isEmpty(cleanProps)
						? Object.keys(cleanProps).map((key, index) => {
								return <code key={index} dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanProps[key], null, 4) || '' }} />
						  })
						: null}
				</div>
				<button onClick={handleClick}>dispatch!</button>
			</header>
		</div>
	)
}

export default App
