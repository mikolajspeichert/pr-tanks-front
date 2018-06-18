import React from 'react'
import { compose, withState, withHandlers, withProps } from 'recompose'
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
  connect(state => ({
    ...hostSelector(state),
    dead: state.getIn(['player', 'dead']),
  })),
  withState('gameState', 'setGameState', gameStates.MENU),
  withHandlers({
    handlePlay: ({ setGameState, host, port }) => () => {
      initSockets(host, port)
      initListeners(() => setGameState(gameStates.GAME))
      setGameState(gameStates.WAITING_FOR_SERVER)
    },
  }),
  withProps(({ dead, gameState, setGameState }) => {
    if (dead && gameState !== gameStates.WAITING_FOR_SERVER)
      setGameState(gameStates.WAITING_FOR_SERVER)
  })
)

const Presentation = enhance(({ gameState, handlePlay, dead }) => {
  switch (gameState) {
    case gameStates.MENU:
      return <Menu onPlay={handlePlay} />
    case gameStates.WAITING_FOR_SERVER:
      return <Waiting isDead={dead} />
    case gameStates.GAME:
      return <Game />
    default:
  }
})

export default Presentation
