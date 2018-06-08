import styled from 'styled-components'
import { colors } from '/src/styled/themes'

const Wrapper = styled.div`
  background-color: ${colors.yellow};
  border-radius: ${({ scale }) => scale * 5}px;
  border: ${colors.yellowLight} solid 1px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  top: ${({ scale }) => scale * 30}px;
  right: ${({ scale }) => scale * 30}px;
  width: ${({ scale }) => scale * 300}px;
  height: ${({ scale }) => scale * 100}px;
  z-index: 2;
  opacity: 0.8;
`

const Text = styled.h1`
  font-size: ${({ scale }) => scale * 25}px;
  margin: 0;
  font-family: 'Invasion2000', sans-serif;
  color: ${colors.brown};
  text-shadow: 0 1px 1px black;
`

export { Wrapper, Text }
