import React, { Component } from 'react'
import { connect } from 'react-redux'
import Matter from 'matter-js'
import { compose, withState, lifecycle, withProps } from 'recompose'
import { Body } from 'react-game-kit'
// import { getPlayerPosition } from 'src/containers/Player/selectors'
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
// const mapSource = require('/src/resources/images/map-bg.png')

const enhance = compose(
  connect((state, props) =>
    // const { scale } = this.context
    ({
      x: 100,
      y: 100,
      color: 'green',
      // scale,
    })
  )
)

const Tank = enhance(({ x, y, color }) => (
  <Wrapper x={x} y={y}>
    <Body args={[x, y, 100, 100]}>
      <Hull url={hull[color]} />
      <Turret url={turret[color]} />
    </Body>
  </Wrapper>
))

export default Tank
