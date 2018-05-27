import { combineReducers } from 'redux-immutable'
import { createReducer } from 'redux-create-reducer'
import { fromJS } from 'immutable'
import { actions } from './actions'

const initialPlayer = fromJS({
  id: 0,
  movDir: 0.0,
  movVal: 0.0,
  x: 3190,
  y: 2540,
  health: 100,
  isFiring: false,
})

const initialOpponents = fromJS({})

const player = createReducer(initialPlayer, {
  [actions.INIT_PLAYER](state, action) {
    return action.payload
  },
})

const opponents = createReducer(initialOpponents, {
  [actions.INIT_OPPONENT](state, action) {
    return state.merge(fromJS({ [action.payload.id]: action.payload }))
  },
})

export default combineReducers({ player, opponents })

// MIN X: 400
// MIN Y: 430
// MAX Y: 2540
// MAX X: 3190
// state:
// {
//    player: {
//      id: 1,
//      movDir: 1.14 *rad*
//      movVal: 2.3 *range -3:3*
//      posX: 40,
//      posY: 104,
//      health: 100, *range 0:100*
//      isFiring: false, *calculated internally*
//    }
//    opponents: {
//      1: {
//        ...player
//      }
