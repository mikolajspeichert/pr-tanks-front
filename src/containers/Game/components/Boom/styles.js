import styled from 'styled-components'

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

const BoomComponent = styled.div.attrs({
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

export { BoomComponent, Wrapper }
