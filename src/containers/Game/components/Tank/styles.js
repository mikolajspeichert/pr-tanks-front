import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(${props => props.x}px, ${props => props.y}px)
    translateZ(0);
  transform-origin: ${props => props.origin};
`

const Hull = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: url(${props => props.url});
  transform: scale(${({ scale }) => scale}) rotate(40deg);
`

const Turret = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: url(${props => props.url});
  transform: scale(${({ scale }) => scale}) rotate(50deg);
`

export { Wrapper, Hull, Turret }
