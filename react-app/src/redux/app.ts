import { todo } from '../data/test.json'

import { Reducer } from './reducer'

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
export const todos: Reducer = (state: InitialState = { todo: todo }, action) => {
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
				second reducer
===============================================*/
export const stuff: Reducer = (state = { stuff: ['asdsad'] }, action) => {
	if (action.type === 'add') return { ...state, stuff: state.stuff.concat(action.item) }
	return state
}
