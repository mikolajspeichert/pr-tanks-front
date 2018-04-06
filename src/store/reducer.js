import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'

const EXAMPLE_ACTION = 'EXAMPLE/ACTION'

const actions = {
  EXAMPLE_ACTION,
}

const initialState = {}

const example = createReducer(initialState, {
  [actions.EXAMPLE_ACTION](state, action) {
    console.log(action)
    return { ...state }
  },
})

export default combineReducers({ example })
