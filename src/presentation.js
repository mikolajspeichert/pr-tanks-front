import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { initListeners, initSockets } from '/src/services/Sockets'
import { hostSelector } from '/src/engine/selectors'
import Game from './containers/Game'
import Waiting from './containers/Waiting'
import Menu from './containers/Menu'

const gameStates = {
  MENU: 1,
  GAME: 2,
  WAITING_FOR_SERVER: 3,
}

const enhance = compose(
  connect(state => ({ ...hostSelector(state) })),
  withState('gameState', 'setGameState', gameStates.MENU),
  withHandlers({
    handlePlay: ({ setGameState, host, port }) => () => {
      initSockets(host, port)
      initListeners(() => setGameState(gameStates.GAME))
      setGameState(gameStates.GAME)
    },
  })
)

const Presentation = enhance(({ gameState, handlePlay }) => {
  switch (gameState) {
    case gameStates.MENU:
      return <Menu onPlay={handlePlay} />
    case gameStates.WAITING_FOR_SERVER:
      return <Waiting />
    case gameStates.GAME:
      return <Game />
    default:
  }
})

export default Presentation
