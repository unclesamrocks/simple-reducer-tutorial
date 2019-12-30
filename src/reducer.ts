import { each as _each } from 'lodash'
/*==============================================
                types
===============================================*/
type Action = { type: string; [payload: string]: any }

type State = { [k: string]: any }

type Subscriber = (prevState: State, currentState: State) => void

export type Reducer = (state: State, action: Action) => State

type Reducers = { [k: string]: Reducer }

interface Store {
	addReducers: (reducers: Reducers) => void
	dispatch: (a: Action) => void
	getState: () => State
	subscribe: (subscriber: Subscriber) => void
	unsubscribe: (subscriber: Subscriber) => void
}

/*==============================================
                store
===============================================*/
const createStore = (): Store => {
	// current reducer sert
	let currentReducerSet = {}
	// set state
	let currentState: State = {}
	// set reducer
	let currentReducer: Reducer = (state, action) => state
	// set subscriptions
	let subscribers: Subscriber[] = []
	// dispatch
	const dispatch = (action: Action) => {
		const prevState = currentState
		currentState = currentReducer({ ...currentState }, action)
		subscribers.forEach(subscriber => subscriber(prevState, currentState))
	}
	// add reducers
	const addReducers = (reducers: Reducers) => {
		currentReducerSet = { ...currentReducerSet, ...reducers }
		currentReducer = (state, action) => {
			const r: any = {}
			_each(currentReducerSet, (reducer: Reducer, key) => {
				r[key] = reducer(state[key], action)
			})
			return r
		}
		// update initial state of currentState
		currentState = currentReducer({ ...currentState }, { type: 'init' })
	}
	// get state (shallow copy)
	const getState = () => ({ ...currentState })
	// subscribe
	const subscribe = (subscriber: Subscriber) => {
		subscribers.push(subscriber)
	}
	// unsubscribe
	const unsubscribe = (subscriber: Subscriber) => {
		subscribers = subscribers.filter(sub => sub !== subscriber)
	}
	// return
	return {
		addReducers,
		dispatch,
		getState,
		subscribe,
		unsubscribe
	}
}

/*==============================================
				instance
===============================================*/
let globalStore: Store | undefined

const getInstance = () => {
	if (!globalStore) globalStore = createStore()
	return globalStore
}
// exports
export default getInstance()
