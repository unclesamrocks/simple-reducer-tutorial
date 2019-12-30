import React from 'react'
import store, { Reducers, State } from '../redux/reducer'

export default function StoreContainer<P>(Component: React.FC<P>, reducers: Reducers) {
	return class extends React.Component<P> {
		constructor(props: P) {
			super(props)
			store.subscribe(this.subscriber.bind(this))
			store.addReducers(reducers)
			this.state = store.getState()
		}

		componentWillUnmount() {
			store.unsubscribe(this.subscriber.bind(this))
		}

		subscriber(prev: State, curr: State) {
			console.log('[store update]')
			console.log('[prev]', prev)
			console.log('[curr]', curr)
			this.setState(curr)
		}

		render() {
			return <Component {...(this.props as P)} {...this.state} />
		}
	}
}
