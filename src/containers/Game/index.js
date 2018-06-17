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
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Loop, Stage, World, KeyListener } from 'react-game-kit'
import {
  playerUpdate,
  playerUpdateMovement,
  playerUpdateTurretAngle,
} from '/src/engine/actions'
import { Cursor } from '/src/styled/components'
import { emitShot } from '/src/services/Sockets'
import {
  playerMovementSelector,
  playerDisplaySelector,
  playerAngleSelector,
  opponentsIdsSelector,
  opponentsPositionsSelector,
} from '/src/engine/selectors'
import Map from '../Map/index'
import Tank from './components/Tank'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import Boom from './components/Boom'
import { checkForCollisions } from './helpers'

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
    opponents: opponentsIdsSelector(state),
    opponentsPositions: opponentsPositionsSelector(state),
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
      opponentsPositions,
    }) => () => {
      let newdir = dir
      if (keys.isDown(keys.SPACE)) {
        if (val > 0.2) {
          dispatch(playerUpdateMovement(val - 0.2))
        } else if (val < -0.2) {
          dispatch(playerUpdateMovement(val + 0.2))
        } else {
          dispatch(playerUpdateMovement(0.0))
        }
      } else if (keys.isDown(87) && val < 3.0) {
        dispatch(playerUpdateMovement(val + 0.1))
      } else if (keys.isDown(83) && val > -3.0) {
        dispatch(playerUpdateMovement(val - 0.1))
      }
      let degDiff = 0
      if (keys.isDown(65)) {
        degDiff = -1
        newdir = dir - 1 < 0 ? 359 : dir - 1
      } else if (keys.isDown(68)) {
        degDiff = 1
        newdir = dir + 1 > 360 ? 1 : dir + 1
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
          res += degDiff
          if (res > 360) res = 0
        } else {
          res =
            Math.abs(turret + 1 - turretTargetAngle) < 1
              ? turretTargetAngle
              : turret - 1
          res += degDiff
          if (res < 0) res = 360
        }
        dispatch(playerUpdateTurretAngle(res))
      }
      let angle = dir * Math.PI / 180.0 + Math.PI / 2
      let newx = x - Math.cos(angle) * val
      let newy = y - Math.sin(angle) * val
      const params = {
        x: newx,
        y: newy,
        oldx: x,
        oldy: y,
        dir: newdir,
        opponents: opponentsPositions,
      }
      if (shot > 0) {
        if (shot + 1 > 10) shoot(0)
        else shoot(shot + 1)
        if (shot === 1) emitShot(newx, newy, turret)
      }
      if (newx === x && newy === y && newdir === dir) return
      checkForCollisions(params, (a, b, c) => dispatch(playerUpdate(a, b, c)))
    },
    handleShot: ({ shoot, shot }) => () => {
      if (shot !== 1) shoot(1)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { keyListener, loop, update } = this.props
      keyListener.subscribe([65, 68, 87, 83, keyListener.SPACE])
      loop.subscribe(update)
    },
    componentWillUnmount() {
      const { keyListener, loop, update } = this.props
      keyListener.unsubscribe()
      loop.unsubscribe(update)
    },
  })
)

const Game = enhance(({ mouseX, mouseY, handleShot, shot, opponents }) => (
  <World>
    <LeftPanel />
    <RightPanel />
    <Map />
    <Tank shot={shot !== 0} />
    {opponents.map(opponent => <Tank key={opponent} id={opponent} opponent />)}
    <Cursor mouseX={mouseX} mouseY={mouseY} onClick={handleShot} />
    <Boom />
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
