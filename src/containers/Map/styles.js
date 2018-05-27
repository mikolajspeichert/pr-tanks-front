import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  transform: translate(${props => props.x}px, ${props => props.y}px)
    translateZ(0);
  transform-origin: ${props => props.origin};
`
export { Wrapper }
