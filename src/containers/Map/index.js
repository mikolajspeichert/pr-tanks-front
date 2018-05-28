import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, getContext } from 'recompose'
import {
  playerPositionSelector,
  playerDisplaySelector,
} from '/src/engine/selectors'

import { Wrapper, Background } from './styles'

const mapSource = require('/src/resources/images/map-bg.png')

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect((state, { scale }) => {
    const { x, y } = playerPositionSelector(state)
    const { x: px, y: py } = playerDisplaySelector(state)
    return { x: (-x + px) * scale, y: (-y + py) * scale, scale }
  })
)

const Map = enhance(({ x, y, scale }) => (
  <Wrapper x={x} y={y} scale={scale}>
    <Background url={mapSource} scale={scale} />
  </Wrapper>
))

export default Map
