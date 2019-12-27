import { todo } from './test.json'

import { createStore, Reducer, Action } from './reducer'

console.log('[Starting...]')
/*==============================================
                actions
===============================================*/
type ActionTypes = 'ADD' | 'REMOVE' | 'UPDATE'

type Todo = { id: string; title: string; price: number }

type InitialState = {
	todo: Todo[]
}
/*==============================================
                reducer
===============================================*/
const reducer: Reducer<ActionTypes> = (state: InitialState, action: Action<ActionTypes>) => {
	switch (action.type) {
		case 'ADD':
			return { ...state, todo: state.todo.concat(action.todo) }
		case 'REMOVE':
			return { ...state, todo: state.todo.filter(todo => todo.id !== action.id) }
		case 'UPDATE':
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
const store = createStore<ActionTypes>({ todo: todo }, reducer)

console.log(store.getState())
store.subscribe((prev, next) => {
	console.log('====================== =========== [ subscribe ] =========== ======================')
	console.log('[prevState]', prev)
	console.log('[nextState]', next)
})
store.dispatch({ type: 'ADD', todo: { id: 6, title: 'New stuff', price: 550 } })
store.dispatch({ type: 'ADD', todo: { id: 7, title: 'Another New stuff', price: 9000 } })
store.dispatch({ type: 'REMOVE', id: 3 })
// console.log('============ [ remove listener] ============')
// unsubLink()
store.dispatch({ type: 'REMOVE', id: 4 })
store.dispatch({ type: 'UPDATE', todo: { id: 6, title: 'Edited stuff here', price: 880 } })
// console.log(store.getState())

const anotherStore = createStore({ todo: [{ id: 555, title: 'diff', price: 999 }] }, reducer)
anotherStore.dispatch({ type: 'ADD', todo: { id: 655, title: 'diff', price: 999 } })
anotherStore.dispatch({ type: 'UPDATE', todo: { id: 555, price: 789 } })
console.log(anotherStore.getState())
