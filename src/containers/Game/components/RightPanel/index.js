import React from 'react'
import { compose, getContext } from 'recompose'
import PropTypes from 'prop-types'

import { Wrapper, Text, HealthBar, Bar } from './styles'

const enhance = compose(getContext({ scale: PropTypes.number }))
const RightPanel = enhance(({ scale }) => (
  <Wrapper scale={scale}>
    <Text scale={scale}>WSAD - MOVE</Text>
    <Text scale={scale}>SPACE - BRAKE</Text>
  </Wrapper>
))

export default RightPanel
