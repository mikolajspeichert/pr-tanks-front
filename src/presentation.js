import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import Sockets from '/src/services/Sockets/core'
import Game from './containers/Game'
import Menu from './containers/Menu'

const gameStates = {
  MENU: 1,
  GAME: 2,
}

const enhance = compose(
  withState('gameState', 'setGameState', gameStates.MENU),
  withHandlers({
    handlePlay: ({ setGameState }) => () => {
      Sockets.init()
      setGameState(gameStates.GAME)
    },
  })
)

const Presentation = enhance(({ gameState, handlePlay }) => {
  switch (gameState) {
    case gameStates.MENU:
      return <Menu onPlay={handlePlay} />
    case gameStates.GAME:
      return <Game />
    default:
  }
})

export default Presentation
