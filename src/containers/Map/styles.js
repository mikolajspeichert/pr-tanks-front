import styled from 'styled-components'

const Wrapper = styled.div.attrs({
  style: ({ x, y, scale }) => ({
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
  }),
})`
  position: absolute;
  cursor: none;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transform-origin: top left;
`

const Background = styled.div`
  position: absolute;
  width: 3600px;
  height: 3000px;
  background: url(${props => props.url});
`

export { Wrapper, Background }
