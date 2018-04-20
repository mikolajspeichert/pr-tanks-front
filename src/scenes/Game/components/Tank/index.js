import React, { Component } from 'react'
import { connect } from 'react-redux'
import Matter from 'matter-js'
import { compose, withState, lifecycle, withProps } from 'recompose'
import { getPlayerPosition } from 'src/containers/Player/selectors'

const enhance = compose(
  connect((state, props) => ({
    ...getPlayerPosition(state),
  }))
)

const Tank = enhance(wrapperStyles => <div>sth</div>)
