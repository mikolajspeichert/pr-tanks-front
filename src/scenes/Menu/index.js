import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, MenuContainer, MenuTitle } from './styles'

const Menu = ({ onPlay }) => (
  <MenuContainer>
    <MenuTitle>PR TANKS</MenuTitle>
    <MenuItem onClick={onPlay}>Play</MenuItem>
    <MenuItem onClick={() => {}}>Settings</MenuItem>
  </MenuContainer>
)

Menu.propTypes = {
  onPlay: PropTypes.func.isRequired,
}
export default Menu
