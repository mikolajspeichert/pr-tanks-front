import React from 'react'
import {
  compose,
  withState,
  lifecycle,
  getContext,
  withHandlers,
  withProps,
} from 'recompose'
import CursorProvider from 'react-cursor-position'
import Matter from 'matter-js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Loop, Stage, World, KeyListener } from 'react-game-kit'
import {
  playerUpdateMovement,
  playerUpdatePosition,
  playerUpdateTurretAngle,
} from '/src/engine/actions'
import { Cursor } from '/src/styled/components'
import { emitShot } from '/src/services/Sockets'
import {
  playerMovementSelector,
  playerDisplaySelector,
  playerAngleSelector,
} from '/src/engine/selectors'
import Map from '../Map/index'
import Tank from './components/Tank'

const enhance = compose(
  getContext({ loop: PropTypes.object, scale: PropTypes.number }),
  withProps(props => ({
    mouseX: props.position.x,
    mouseY: props.position.y,
  })),
  connect(state => ({
    ...playerMovementSelector(state),
    display: playerDisplaySelector(state),
    turret: playerAngleSelector(state).turretDeg,
  })),
  withState('keyListener', 'setKeyListener', new KeyListener()),
  withState('shot', 'shoot', 0),
  withHandlers({
    update: ({
      x,
      y,
      dir,
      val,
      dispatch,
      keyListener: keys,
      display,
      mouseX,
      mouseY,
      turret,
      scale,
      shot,
      shoot,
    }) => () => {
      if (keys.isDown(keys.UP) && val < 3.0) {
        dispatch(playerUpdateMovement(dir, val + 0.1))
      } else if (keys.isDown(keys.DOWN) && val > 0.0) {
        dispatch(playerUpdateMovement(dir, val - 0.1))
      } else if (val < 0.0) {
        dispatch(playerUpdateMovement(dir, 0))
      }
      if (keys.isDown(keys.LEFT)) {
        dispatch(playerUpdateMovement(dir - 2 < 0 ? 358 : dir - 2, val))
      } else if (keys.isDown(keys.RIGHT)) {
        dispatch(playerUpdateMovement(dir + 2 > 360 ? 2 : dir + 2, val))
      }
      let turretTargetAngle = Math.round(
        Math.atan2(mouseY - display.y * scale, mouseX - display.x * scale) *
          180 /
          Math.PI +
          180
      )
      if (turretTargetAngle !== turret) {
        let left = turret - turretTargetAngle
        if (left < 0) left += 360
        let right = turretTargetAngle - turret
        if (right < 0) right += 360
        let res
        if (left > right) {
          res =
            Math.abs(turret + 1 - turretTargetAngle) < 1
              ? turretTargetAngle
              : turret + 1
          if (res > 360) res = 0
        } else {
          res =
            Math.abs(turret + 1 - turretTargetAngle) < 1
              ? turretTargetAngle
              : turret - 1
          if (res < 0) res = 360
        }
        dispatch(playerUpdateTurretAngle(res))
      }
      let angle = dir * Math.PI / 180.0 + Math.PI / 2
      let newx = x - Math.cos(angle) * val
      let newy = y - Math.sin(angle) * val
      if (newx !== x || newy !== y) dispatch(playerUpdatePosition(newx, newy))
      if (shot > 0) {
        if (shot + 1 > 10) shoot(0)
        else shoot(shot + 1)
        if (shot === 1) emitShot(newx, newy, turret)
      }
    },
    handleShot: ({ shoot, shot }) => () => {
      if (shot !== 1) shoot(1)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { keyListener, loop, update } = this.props
      keyListener.subscribe([
        keyListener.LEFT,
        keyListener.RIGHT,
        keyListener.UP,
        keyListener.DOWN,
        keyListener.SPACE,
      ])
      loop.subscribe(update)
    },
    componentWillUnmount() {
      const { keyListener, loop, update } = this.props
      keyListener.unsubscribe()
      loop.unsubscribe(update)
    },
  })
)

const Game = enhance(({ mouseX, mouseY, handleShot, shot }) => (
  <World>
    <Map />
    <Tank shot={shot !== 0} />
    <Cursor mouseX={mouseX} mouseY={mouseY} onClick={handleShot} />
  </World>
))

const LoopedGame = () => (
  <Loop>
    <Stage>
      <CursorProvider style={{ width: '100%', height: '100%' }}>
        <Game />
      </CursorProvider>
    </Stage>
  </Loop>
)
export default LoopedGame
