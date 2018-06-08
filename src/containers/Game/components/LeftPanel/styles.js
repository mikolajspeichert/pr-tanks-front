import styled from 'styled-components'
import { colors } from '/src/styled/themes'

const Wrapper = styled.div`
  background-color: ${colors.yellow};
  border-radius: ${({ scale }) => scale * 5}px;
  border: ${colors.yellowLight} solid 1px;
  position: absolute;
  display: flex;
  align-items: center;
  top: ${({ scale }) => scale * 30}px;
  left: ${({ scale }) => scale * 30}px;
  width: ${({ scale }) => scale * 200}px;
  height: ${({ scale }) => scale * 60}px;
  z-index: 2;
  opacity: 0.7;
`

const Text = styled.h1`
  font-size: ${({ scale }) => scale * 40}px;
  margin: ${({ scale }) => scale * -10}px ${({ scale }) => scale * 20}px 0;
  font-family: 'Invasion2000', sans-serif;
  color: ${colors.brown};
  text-shadow: 0 2px 2px black;
`

const HealthBar = styled.div`
  width: ${({ scale }) => scale * 80}px;
  height: ${({ scale }) => scale * 25}px;
  border: ${colors.gray} solid 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 0 1px 1px black;
`

const Bar = styled.div`
  width: ${({ scale, health }) => scale * health * 0.8}px;
  height: ${({ scale }) => scale * 25}px;
  background-color: ${colors.red};
`

export { Wrapper, Text, HealthBar, Bar }
