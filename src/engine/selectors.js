import { createSelector } from 'reselect'

const xHalf = 512
const yHalf = 288

const playerSelector = state => state.get('player')

const playerIdSelector = state => state.getIn(['player', 'id'])

const opponentsSelector = state => state.get('opponents')

const opponentSelector = (state, id) => state.getIn(['opponents', id])

const playerPositionSelector = createSelector(playerSelector, player => ({
  x: player.get('x'),
  y: player.get('y'),
}))

const opponentPositionSelector = createSelector(opponentSelector, player => ({
  x: player.get('x'),
  y: player.get('y'),
}))

const opponentsIdsSelector = createSelector(opponentsSelector, opponents =>
  [...opponents.keys()]
)

const playerMovementSelector = createSelector(playerSelector, player => ({
  x: player.get('x'),
  y: player.get('y'),
  dir: player.get('movDir'),
  val: player.get('movVal'),
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

const opponentDisplaySelector = createSelector(
  opponentPositionSelector,
  playerPositionSelector,
  playerDisplaySelector,
  ({ x, y }, playerPos, playerDisp) => {
    let a
    let b
    a = playerPos.x - x
    b = playerPos.y - y
    return { x: playerDisp.x - a, y: playerDisp.y - b }
  }
)

const playerAngleSelector = createSelector(playerSelector, player => ({
  hullDeg: player.get('movDir'),
  turretDeg: player.get('turretDir'),
}))

const opponentAngleSelector = createSelector(opponentSelector, player => ({
  hullDeg: player.get('movDir'),
  turretDeg: player.get('turretDir'),
  shot: player.get('isFiring'),
}))

export {
  playerPositionSelector,
  playerSelector,
  playerIdSelector,
  opponentsIdsSelector,
  opponentAngleSelector,
  opponentDisplaySelector,
  playerDisplaySelector,
  playerMovementSelector,
  playerAngleSelector,
}
