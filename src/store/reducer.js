import { combineReducers } from 'redux'
import { PlayerReducer } from '../containers/Player'

const gameClientsInitialState = {
  instances: [],
}

export default combineReducers({ PlayerReducer })
