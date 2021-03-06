import React from 'react'
import { compose, getContext, withProps } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { death } from '/src/engine/actions'
import { playerHealthSelector } from '/src/engine/selectors'

import { Wrapper, Text, HealthBar, Bar } from './styles'

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect(state => {
    const health = playerHealthSelector(state)
    const shooterId = state.getIn(['player', 'lastHitBy'])
    return { health, shooterId }
  }),
  withProps(({ health, dispatch, shooterId }) => {
    if (health <= 0) {
      dispatch(death(shooterId))
    }
  })
)
const LeftPanel = enhance(({ scale, health }) => (
  <Wrapper scale={scale}>
    <Text scale={scale}>HP</Text>
    <HealthBar scale={scale}>
      <Bar scale={scale} health={health} />
    </HealthBar>
  </Wrapper>
))

export default LeftPanel
