import { todo } from './test.json'

import { createStore, Reducer, Action, State } from './reducer'

console.log('[Starting...]')
/*==============================================
                actions
===============================================*/
enum ActionTypes {
	'ADD' = 'ADD',
	'REMOVE' = 'REMOVE',
	'UPDATE' = 'UPDATE'
}

type Todo = { id: number; title: string; price: number }

type InitialState = {
	todo: Todo[]
}
/*==============================================
                reducer
===============================================*/
const reducer: Reducer = (state: InitialState = { todo: todo }, action) => {
	switch (action.type) {
		case ActionTypes.ADD:
			return { ...state, todo: state.todo.concat(action.todo) }
		case ActionTypes.REMOVE:
			return { ...state, todo: state.todo.filter(todo => todo.id !== action.id) }
		case ActionTypes.UPDATE:
			return {
				...state,
				todo: state.todo.map(todo => {
					if (todo.id !== action.todo.id) return todo
					else return { ...todo, ...action.todo }
				})
			}
	}
	return state
}
/*==============================================
                init
===============================================*/
const store = createStore()
store.addReducers({ todos: reducer })

console.log('=================== { init } ===================')
console.log(store.getState())
store.subscribe((prev, next) => {
	console.log('====================== =========== [ subscribe ] =========== ======================')
	console.log('[prevState]', prev.todos)
	console.log('[nextState]', next.todos)
})
store.dispatch({ type: ActionTypes.ADD, todo: { id: 6, title: 'New stuff', price: 550 } })
store.dispatch({ type: ActionTypes.ADD, todo: { id: 7, title: 'Another New stuff', price: 9000 } })
store.dispatch({ type: ActionTypes.REMOVE, id: 3 })
store.dispatch({ type: ActionTypes.REMOVE, id: 4 })
store.dispatch({ type: ActionTypes.UPDATE, todo: { id: 6, title: 'Edited stuff here', price: 880 } })

/*==============================================
				second init
===============================================*/
const newReducer: Reducer = (state: State = { stuff: ['asdsad'] }, action: Action) => {
	if (action.type === 'add') return { ...state, stuff: state.stuff.concat(action.item) }
	return state
}
store.addReducers({ stuff: newReducer })
store.subscribe((prev, next) => {
	console.log(prev.stuff || null, next.stuff)
})
store.dispatch({ type: 'add', item: 'new item' })
store.dispatch({ type: 'add', item: 'another stuff' })
