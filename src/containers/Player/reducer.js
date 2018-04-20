import { createReducer } from 'redux-create-reducer'
import { actions } from './actions'

const playerInitialState = {
  position: {
    x: 0,
    y: 0,
  },
  velocityVectors: [],
  health: 100,
}

const player = createReducer(playerInitialState, {
  [actions.EXAMPLE_ACTION](state, action) {
    return { ...state }
  },
})

export default player
