import React from 'react'
import ReactDOM from 'react-dom'

import './css/index.css'

import App from './App'
import StoreContainer from './containers/StoreContainer'

import store from './redux/reducer'
import { todos, stuff } from './redux/app'

const StateContainer = StoreContainer(App, { todos, stuff })

ReactDOM.render(<StateContainer dispatch={store.dispatch} />, document.getElementById('root'))
