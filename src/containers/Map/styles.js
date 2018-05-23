import styled from 'styled-components'

const mapSource = require('/src/resources/images/map-bg.png')

const Wrapper = styled.div`
  position: absolute;
  transform: translate(${props => props.x}px, ${props => props.y}px)
    translateZ(0);
  transform-origin: ${props => props.origin};
`
export { Wrapper }
