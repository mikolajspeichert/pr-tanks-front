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

const Hull = styled.div.attrs({
  style: ({ scale, deg }) => ({
    transform: `scale(${scale}) rotate(${deg}deg)`,
  }),
})`
  position: absolute;
  width: 100px;
  height: 100px;
  background: url(${props => props.url});
`

const Turret = styled.div.attrs({
  style: ({ scale, deg }) => ({
    transform: `scale(${scale}) rotate(${deg - 90}deg)`,
  }),
})`
  position: absolute;
  width: 200px;
  height: 200px;
  background: url(${props => props.url});
`

export { Wrapper, Hull, Turret }
