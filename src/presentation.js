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
  withState('areListenersReady', 'setListeners', false),
  withHandlers({
    handlePlay: ({ setGameState, host, port, setListeners }) => () => {
      initSockets(host, port)
      initListeners(() => {
        setGameState(gameStates.GAME)
        setListeners(true)
      })
      setGameState(gameStates.WAITING_FOR_SERVER)
    },
  }),
  withProps(({ dead, gameState, setGameState, areListenersReady }) => {
    if (dead && gameState !== gameStates.WAITING_FOR_SERVER)
      setGameState(gameStates.WAITING_FOR_SERVER)
    if (!dead && areListenersReady && gameState !== gameStates.GAME)
      setTimeout(() => setGameState(gameStates.GAME), 1000)
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
