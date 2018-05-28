import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Matter from 'matter-js'
import { compose, getContext } from 'recompose'
import { playerDisplaySelector, playerAngleSelector } from '/src/engine/selectors'
import { Body } from 'react-game-kit'
import { Wrapper, Hull, Turret } from './styles'

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

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect((state, props) => {
    const { scale } = props
    const { x, y } = playerDisplaySelector(state)
    const { hullDeg, turretDeg } = playerAngleSelector(state)
    return {
      x: x * scale,
      y: y * scale,
      color: 'green',
      scale,
      hullDeg,
      turretDeg,
    }
  })
)

const Tank = enhance(({ x, y, color, scale, hullDeg, turretDeg }) => (
  <Wrapper x={x} y={y}>
    <Body args={[x, y, 100 * scale, 100 * scale]}>
      <Hull url={hull[color]} scale={scale} deg={hullDeg} />
      <Turret url={turret[color]} scale={scale} deg={turretDeg} />
    </Body>
  </Wrapper>
))

export default Tank
