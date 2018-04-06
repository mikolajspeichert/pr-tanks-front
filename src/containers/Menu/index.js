import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'

const Menu = ({ onPlay }) => (
  <div>
    <p>Play</p>
  </div>
)

Menu.propTypes = {
  onPlay: PropTypes.func.isRequired,
}
export default Menu
