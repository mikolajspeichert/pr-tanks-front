import React from 'react'
import PropTypes from 'prop-types'
import { TileMap } from 'react-game-kit'

import { Wrapper } from './styles'

const mapSource = require('/src/resources/images/map-bg.png')

const Map = (props, context) => {
  return (
    <Wrapper x={0} y={0} origin="top right">
      <TileMap
        src={mapSource}
        rows={1}
        columns={1}
        tileSize={3600}
        layers={[1]}
      />
    </Wrapper>
  )
}

export default Map
