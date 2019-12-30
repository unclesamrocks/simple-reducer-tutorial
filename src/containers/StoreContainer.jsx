import React from 'react'
import store from '../reducer'

const subscriber = (prev, curr) => {
	this.setState(curr)
}

export default function StoreContainer(Component, reducers) {
	return class extends React.Component {
		constructor(props) {
			super(props)
			this.state = store.getState()
			this.instSubscriber = subscriber.bind(this)
			store.subscribe(this.instSubscriber)
			store.addReducers(reducers)
		}

		componentWillUnmount() {
			store.unsubscribe(this.instSubscriber)
		}

		render() {
			return <Component {...this.props} {...this.state} />
		}
	}
}
