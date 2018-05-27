import { combineReducers } from 'redux'
import { createReducer } from 'redux-create-reducer'
import { fromJS } from 'immutable'
import { PlayerReducer } from '../containers/Player'

const actions = {
  INIT_PLAYER: 'player/INIT',
  INIT_OPPONENT: 'opponent/INIT',
}

const initialPlayer = fromJS({
  id: 0,
  movDir: 0.0,
  movVal: 0.0,
  posX: 0,
  posY: 0,
  health: 100,
  isFiring: false,
})

const initialOpponents = fromJS({})

const player = createReducer(initialPlayer, {
  [actions.INIT_PLAYER](state, action) {
    return action.payload
  },
})

const opponents = createReducer(initialPlayer, {
  [actions.INIT_OPPONENT](state, action) {
    return state.merge(fromJS({ [action.payload.id]: action.payload }))
  },
})

export default combineReducers({ player, opponents })

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
