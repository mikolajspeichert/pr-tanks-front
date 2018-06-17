import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose, getContext } from 'recompose'
import { boomSelector } from '/src/engine/selectors'
import { Wrapper, BoomComponent } from './styles'

const boomURL = require('/src/resources/images/boom.png')

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect((state, props) => {
    const { scale } = props
    const { x, y, isActive, deg } = boomSelector(state)
    return {
      x: x * scale,
      y: y * scale,
      scale,
      isActive,
      deg,
    }
  })
)

const Boom = enhance(({ x, y, scale, isActive, deg }) => {
  return isActive ? (
    <Wrapper x={x} y={y}>
      <BoomComponent url={boomURL} scale={scale} deg={deg} />
    </Wrapper>
  ) : null
})

export default Boom
