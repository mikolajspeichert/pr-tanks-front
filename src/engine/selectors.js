import { createSelector } from 'reselect'

const xHalf = 512
const yHalf = 288

const playerSelector = state => state.get('player')

const playerPositionSelector = createSelector(playerSelector, player => ({
  x: player.get('x'),
  y: player.get('y'),
}))

const playerDisplaySelector = createSelector(
  playerPositionSelector,
  ({ x, y }) => {
    let a
    let b
    if (x < xHalf) a = x
    else if (x > 3600 - xHalf) a = xHalf + x - (3600 - xHalf)
    else a = xHalf
    if (y < yHalf) b = y
    else if (y > 3000 - yHalf) b = yHalf + y - (3000 - yHalf)
    else b = yHalf
    return { x: a, y: b }
  }
)

export { playerPositionSelector, playerSelector, playerDisplaySelector }
