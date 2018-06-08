import React from 'react'
import { compose, getContext } from 'recompose'
import PropTypes from 'prop-types'

import { Wrapper, Text, HealthBar, Bar } from './styles'

const enhance = compose(getContext({ scale: PropTypes.number }))
const LeftPanel = enhance(({ scale, health }) => (
  <Wrapper scale={scale}>
    <Text scale={scale}>HP</Text>
    <HealthBar scale={scale}>
      <Bar scale={scale} health={health} />
    </HealthBar>
  </Wrapper>
))

export default LeftPanel
