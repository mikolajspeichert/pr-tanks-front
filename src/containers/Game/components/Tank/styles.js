import styled from 'styled-components'
import { colors } from '/src/styled/themes'

const Wrapper = styled.div.attrs({
  style: ({ x, y }) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
})`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Hull = styled.div.attrs({
  style: ({ scale, deg }) => ({
    transform: `scale(${scale}) rotate(${deg}deg)`,
  }),
})`
  position: absolute;
  width: 100px;
  height: 100px;
  cursor: none;
  background: url(${props => props.url});
`

const Turret = styled.div.attrs({
  style: ({ scale, deg }) => ({
    transform: `scale(${scale}) rotate(${deg - 90}deg)`,
  }),
})`
  position: absolute;
  width: 200px;
  cursor: none;
  height: 200px;
  background: url(${props => props.url});
`

const HealthBar = styled.div`
  width: ${({ scale }) => scale * 60}px;
  height: ${({ scale }) => scale * 10}px;
  border: ${colors.gray} solid 1px;
  background-color: ${colors.grayLight};
  display: flex;
  position: absolute;
  margin-top: ${({ scale }) => scale * -40}px;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 0 1px 1px black;
  opacity: 0.7;
  z-index: 50;
`

const Bar = styled.div`
  width: ${({ scale, health }) => scale * health * 0.6}px;
  height: ${({ scale }) => scale * 10}px;
  background-color: ${colors.red};
`

export { Wrapper, Hull, Turret, HealthBar, Bar }
