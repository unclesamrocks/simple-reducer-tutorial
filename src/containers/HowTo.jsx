import React from 'react'
import ReactDom from 'react-dom'
import StoreContainer from './StoreContainer'
import { reducer, newReducer } from '../app'

const MyApp = props => {
	return <div className="App">Some data</div>
}

ReactDom.render(StoreContainer(<MyApp />, { reducer, newReducer }), document.getElementById('app'))
