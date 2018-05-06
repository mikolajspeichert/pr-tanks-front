import React, { Component } from 'react'
import { connect } from 'react-redux'
import Matter from 'matter-js'
import { compose, withState, lifecycle, withProps } from 'recompose'
import { Body } from 'react-game-kit'
import { getPlayerPosition } from 'src/containers/Player/selectors'

const enhance = compose(
  connect((state, props) => {
    const { scale } = this.context
    const { x, y } = getPlayerPosition(state)
    const wrapperStyles = {
      position: 'absolute',
      transform: `translate(${x * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    }
    return {
      wrapperStyles,
    }
  })
)

const Tank = enhance(wrapperStyles => <div style={wrapperStyles}>
  <Body>

  </Body>
</div>)
