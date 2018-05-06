import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import Menu from './scenes/Menu'
import Sockets from './services/Sockets'

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
  let render
  switch (gameState) {
    case gameStates.MENU:
      return <Menu onPlay={handlePlay} />
    case gameStates.GAME:
      return <div />
    default:
      break
  }

  return render
})

export default Presentation
