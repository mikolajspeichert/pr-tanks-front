import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { hostSelector } from '/src/engine/selectors'
import { changeHost } from '/src/engine/actions'
import { MenuItem, MenuContainer, MenuTitle } from './styles'
import HostForm from './components/HostForm'

const enhance = compose(
  connect(state => ({ ...hostSelector(state) })),
  withState('showingSettings', 'setSettings', false),
  withState('fullscreen', 'setFullscreen', 'off'),
  withHandlers({
    onChangeHost: ({ setSettings, showingSettings, dispatch }) => (
      host,
      port
    ) => {
      dispatch(changeHost(host, port))
      setSettings(!showingSettings)
    },
    onSettings: ({ setSettings }) => () => setSettings(true),
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
  ({
    onPlay,
    onSettings,
    showingSettings,
    fullscreen,
    onFullscreen,
    host,
    port,
    onChangeHost,
  }) => {
    let content
    if (showingSettings) {
      content = (
        <MenuContainer>
          <MenuTitle>Settings</MenuTitle>
          <MenuItem onClick={onFullscreen}>Fullscreen: {fullscreen}</MenuItem>
          <HostForm host={host} port={port} onChangeHost={onChangeHost} />
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
