import React from 'react'
import { compose, withState, lifecycle, withHandlers } from 'recompose'

import { Container, Title } from './styles'

let loaderCounter = 0

function getDots(n) {
  return (n * n * n + 2 * n * n + 2) % 4
}

const enhance = compose(
  withState('dots', 'setDots', '...'),
  withState('looper', 'setLooper', undefined),
  withHandlers({
    timer: ({ dots, setDots }) => () => {
      const dotsAmounts = getDots(loaderCounter++)
      setDots('.'.repeat(dotsAmounts))
    },
  }),
  lifecycle({
    componentDidMount() {
      const { timer, setLooper } = this.props
      setLooper(setInterval(timer, 500))
    },
    componentWillUnmount() {
      const { looper } = this.props
      looper && clearInterval(looper)
    },
  })
)

const Waiting = enhance(({ dots, dead }) => (
  <Container>
    <Title>{!dead ? `Waiting for server${dots}` : `You are dead${dots}`}</Title>
  </Container>
))

export default Waiting
