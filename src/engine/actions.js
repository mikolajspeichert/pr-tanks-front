const actions = {
  INIT_PLAYER: 'player/INIT',
  PLAYER_UPDATE_POS: 'player/POS',
  PLAYER_UPDATE_MOV: 'player/MOV',
  PLAYER_UPDATE_TURRET: 'player/TURRET',
  INIT_OPPONENT: 'opponent/INIT',
}

const playerUpdatePosition = (x, y) => ({
  type: actions.PLAYER_UPDATE_POS,
  payload: {
    x,
    y,
  },
})

const playerUpdateMovement = (dir, val) => ({
  type: actions.PLAYER_UPDATE_MOV,
  payload: {
    dir,
    val,
  },
})

const playerUpdateTurretAngle = dir => ({
  type: actions.PLAYER_UPDATE_TURRET,
  payload: {
    dir,
  },
})

export {
  actions,
  playerUpdatePosition,
  playerUpdateMovement,
  playerUpdateTurretAngle,
}
