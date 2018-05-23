import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'

import { MenuItem, MenuContainer, MenuTitle } from './styles'

const enhance = compose(
  withState('showingSettings', 'setSettings', false),
  withState('fullscreen', 'setFullscreen', 'off'),
  withHandlers({
    onSettings: ({ setSettings, showingSettings }) => () =>
      setSettings(!showingSettings),
    onFullscreen: ({ fullscreen, setFullscreen }) => () => {
      if (fullscreen === 'off') {
        document.getElementById('root').webkitRequestFullScreen &&
          document.getElementById('root').webkitRequestFullScreen()
        setFullscreen('on')
      } else {
        setFullscreen('off')
        document.webkitCancelFullScreen()
      }
    },
  })
)
const Menu = enhance(
  ({ onPlay, onSettings, showingSettings, fullscreen, onFullscreen }) => {
    let content
    if (showingSettings) {
      content = (
        <MenuContainer>
          <MenuTitle>Settings</MenuTitle>
          <MenuItem onClick={onFullscreen}>Fullscreen: {fullscreen}</MenuItem>
          <MenuItem onClick={onSettings}>Back</MenuItem>
        </MenuContainer>
      )
    } else {
      content = (
        <MenuContainer>
          <MenuTitle>PR TANKS</MenuTitle>
          <MenuItem onClick={onPlay}>Play</MenuItem>
          <MenuItem onClick={onSettings}>Settings</MenuItem>
        </MenuContainer>
      )
    }
    return content
  }
)

Menu.propTypes = {
  onPlay: PropTypes.func.isRequired,
}
export default Menu
