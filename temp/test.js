/*==============================================
                store
===============================================*/
const createStore = (reducer, initialState = {}) => {
	let state = initialState
	const listeners = []

	return {
		getState() {
			return state
		},
		subscribe(listener) {
			listeners.push(listener)

			// Returns an unsubscribe function
			return () => {
				const index = listeners.indexOf(listener)
				listeners.splice(index, 1)
			}
		},
		dispatch(action) {
			state = reducer(state, action)

			listeners.forEach(listener => {
				listener()
			})
		}
	}
}

/*==============================================
                reducer
===============================================*/
const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD': {
			return { ...state, todos: state.todos.concat(action.todo) }
		}
		case 'REMOVE': {
			return { ...state, todos: state.todos.filter(item => item.id !== action.id) }
		}
		default: {
			return state
		}
	}
}

/*==============================================
                init
===============================================*/
const store = createStore(reducer, {
	todos: [
		{ id: 1, text: 'todo one number' },
		{ id: 2, text: 'todo one number' },
		{ id: 3, text: 'todo one number' }
	]
})

const unsubscribe = store.subscribe(() => {
	console.log('[store] updated!')
	console.log(store.getState())
})
// console.log('[subscribe]', unsubscribe)
store.dispatch({ type: 'ADD', todo: { id: 4, text: 'new todo four' } })
console.log('unsubbing!')
unsubscribe()
store.dispatch({ type: 'ADD', todo: { id: 5, text: 'new todo five' } })
store.subscribe(() => console.log('[another]', store.getState()))
store.dispatch({ type: 'ADD', todo: { id: 6, text: 'new todo six' } })
store.dispatch({ type: 'REMOVE', id: 4 })
