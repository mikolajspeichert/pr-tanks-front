import styled from 'styled-components'
import { colors } from '/src/styled/themes'

const image = require('../../resources/images/menu-bg.png')

const MenuTitle = styled.h1`
  font-size: 80px;
  margin: 20px;
  cursor: default;
  font-family: 'Invasion2000', sans-serif;
  color: ${colors.brown};
  text-shadow: 0 4px 2px black;
`

const MenuItem = styled.p`
  font-size: 60px;
  cursor: pointer;
  margin: 20px;
  font-family: 'Invasion2000', sans-serif;
  color: ${colors.brown};
  text-shadow: 0 4px 2px black;
  &:hover,
  &:active {
    color: ${colors.orange};
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: url(${image}) no-repeat center;
`
export { MenuItem, MenuContainer, MenuTitle }
