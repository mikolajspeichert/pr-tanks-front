import React from 'react'
import { compose, getContext } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Wrapper, ColoredText } from './styles'

const getColorName = id => {
  switch (id) {
    case '0':
      return 'GREEN '
    case '1':
      return 'RED '
    case '2':
      return 'GRAY '
    case '3':
      return 'YELLOW '
    default:
      return 'ERROR'
  }
}

const enhance = compose(
  getContext({ scale: PropTypes.number }),
  connect(state => ({
    stats: state.getIn(['settings', 'stats']).toJS(),
  }))
)
const RightPanel = enhance(({ scale, stats }) => (
  <Wrapper scale={scale}>
    {Object.keys(stats).map(key => (
      <ColoredText key={key} color={key} scale={scale}>{`${getColorName(
        key
      )} K:${stats[key].kills} D:${stats[key].deaths}`}</ColoredText>
    ))}
  </Wrapper>
))

export default RightPanel
