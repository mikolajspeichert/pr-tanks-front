import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transform: translate(${props => props.x}px, ${props => props.y}px)
    scale(${({ scale }) => scale});
  transform-origin: top left;
`

const Background = styled.div`
  position: absolute;
  width: 3600px;
  height: 3000px;
  background: url(${props => props.url});
`

export { Wrapper, Background }
