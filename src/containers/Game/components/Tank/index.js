import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Matter from 'matter-js'
import { compose, getContext } from 'recompose'
import {
  playerDisplaySelector,
  playerAngleSelector,
  opponentDisplaySelector,
  opponentAngleSelector,
  playerIdSelector,
  opponentHealthSelector,
} from '/src/engine/selectors'
import { Wrapper, Hull, Turret, HealthBar, Bar } from './styles'

const colors = ['green', 'red', 'gray', 'yellow']

const hull = {
  green: require('/src/resources/images/hull-green.png'),
  red: require('/src/resources/images/hull-red.png'),
  gray: require('/src/resources/images/hull-gray.png'),
  yellow: require('/src/resources/images/hull-yellow.png'),
}
const turret = {
  green: require('/src/resources/images/turret-green.png'),
  red: require('/src/resources/images/turret-red.png'),
  gray: require('/src/resources/images/turret-gray.png'),
  yellow: require('/src/resources/images/turret-yellow.png'),
}

const turretFiring = {
  green: require('/src/resources/images/turret-green-firing.png'),
  red: require('/src/resources/images/turret-red-firing.png'),
  gray: require('/src/resources/images/turret-gray-firing.png'),
  yellow: require('/src/resources/images/turret-yellow-firing.png'),
}

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect((state, props) => {
    const { scale, opponent, id } = props
    if (opponent) {
      const { x, y } = opponentDisplaySelector(state, id)
      const { hullDeg, turretDeg, shot } = opponentAngleSelector(state, id)
      const health = opponentHealthSelector(state, id)
      return {
        x: x * scale,
        y: y * scale,
        color: colors[id],
        scale,
        hullDeg,
        turretDeg,
        shot,
        health,
      }
    }
    const { x, y } = playerDisplaySelector(state)
    const { hullDeg, turretDeg } = playerAngleSelector(state)
    const playerId = playerIdSelector(state)
    return {
      x: x * scale,
      y: y * scale,
      color: colors[playerId],
      scale,
      hullDeg,
      turretDeg,
    }
  })
)

const Tank = enhance(
  ({ x, y, color, scale, hullDeg, turretDeg, shot, health }) => (
    <Wrapper x={x} y={y}>
      {health && (
        <HealthBar scale={scale}>
          <Bar scale={scale} health={health} />
        </HealthBar>
      )}
      <Hull url={hull[color]} scale={scale} deg={hullDeg} />
      <Turret
        url={shot ? turretFiring[color] : turret[color]}
        scale={scale}
        deg={turretDeg}
      />
    </Wrapper>
  )
)

export default Tank
