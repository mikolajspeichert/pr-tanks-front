import React from 'react'
import { compose, withState, lifecycle } from 'recompose'
import Matter from 'matter-js'
import { Loop, Stage, World, KeyListener } from 'react-game-kit'

const enhance = compose(
  withState('keyListener', 'setKeyListener', new KeyListener()),
  lifecycle({
    componentDidMount() {
      const { keyListener } = this.props
      keyListener.subscribe([
        keyListener.LEFT,
        keyListener.RIGHT,
        keyListener.UP,
        keyListener.DOWN,
        keyListener.SPACE,
      ])
    },
    componentWillUnmount() {
      this.props.keyListener.unsubscribe()
    },
  }),
  withState('example', 'setExample', false)
)

const Game = enhance(({ example }) => (
  <Loop>
    <Stage>
      <World />
    </Stage>
  </Loop>
))

export default Game
