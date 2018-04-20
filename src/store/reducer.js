import { combineReducers } from 'redux'
import player from 'src/containers/Player'

const gameClientsInitialState = {
  instances: [],
}

export default combineReducers({ player })
