import React from 'react'
import PropTypes from 'prop-types'
import { compose, getContext } from 'recompose'
import { Wrapper, BoomComponent } from './styles'

const boomURL = require('/src/resources/images/boom.png')

const enhance = compose(getContext({ scale: PropTypes.number }))

const Boom = enhance(({ x, y, scale, deg }) => (
  <Wrapper x={x * scale} y={y * scale}>
    <BoomComponent url={boomURL} scale={scale} deg={deg} />
  </Wrapper>
))

export default Boom
