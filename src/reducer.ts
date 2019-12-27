/*==============================================
                types
===============================================*/
export type Action<T> = { type: T; [payload: string]: any }

export type State = any

export type Subscriber = (prevState: State, currentState: State) => void

export type Reducer<T> = (state: State, action: Action<T>) => State

/*==============================================
                store
===============================================*/
export const createStore = <T>(state: State, reducer: Reducer<T>) => {
	// set state
	let currentState = state
	// set reducer
	let currentReducer = reducer
	// set subscriptions
	let subscribers: Subscriber[] = []
	// dispatch
	const dispatch = (action: Action<T>) => {
		const prevState = currentState
		currentState = currentReducer({ ...currentState }, action)
		subscribers.forEach(subscriber => subscriber(prevState, currentState))
	}
	// get state
	const getState = () => currentState
	// subscrribe
	const subscribe = (subscriber: Subscriber) => {
		subscribers.push(subscriber)
		return () => {
			subscribers = subscribers.filter(sub => sub !== subscriber)
		}
	}
	// return
	return {
		dispatch: dispatch,
		getState: getState,
		subscribe: subscribe
	}
}
