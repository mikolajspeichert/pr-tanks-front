import React from 'react'
import { compose, withState } from 'recompose'
import { Loop, Stage, World } from 'react-game-kit'

const enhance = compose(withState('example', 'setExample', false))

const Game = enhance(({ example }) => (
  <Loop>
    <Stage>
      <World />
    </Stage>
  </Loop>
))

export default Game
