import { each as _each, isEmpty } from 'lodash'

/*==============================================
                types
===============================================*/
export type Action = { type: string; [payload: string]: any }

export type State = { [k: string]: any }

type Subscriber = (prevState: State, currentState: State) => void

export type Reducer = (state: State, action: Action) => State

type Reducers = { [k: string]: Reducer }

/*==============================================
                store
===============================================*/
export const createStore = () => {
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
		addReducers: addReducers,
		dispatch: dispatch,
		getState: getState,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	}
}
