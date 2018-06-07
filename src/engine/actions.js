import {
  emitMovementChange,
  emitTurretAngleChange,
  emitPositionChange,
} from '/src/services/Sockets'

const actions = {
  INIT_PLAYER: 'player/INIT',
  PLAYER_UPDATE_POS: 'player/POS',
  PLAYER_UPDATE_MOV: 'player/MOV',
  PLAYER_UPDATE_TURRET: 'player/TURRET',
  PLAYER_SHOT: 'player/SHOT',
  INIT_OPPONENT: 'opponent/INIT',
  OPPONENT_MOVEMENT: 'opponent/MOV',
  OPPONENT_POS: 'opponent/POS',
  OPPONENT_TURRET: 'opponent/TURRET',
  OPPONENT_SHOT: 'opponent/SHOT',
  HIT: 'HIT',
  HIT_END: 'HIT_END',
}

const playerUpdatePosition = (x, y) => {
  emitPositionChange(x, y)
  return {
    type: actions.PLAYER_UPDATE_POS,
    payload: {
      x,
      y,
    },
  }
}

const playerUpdateMovement = (dir, val) => {
  emitMovementChange(dir, val)
  return {
    type: actions.PLAYER_UPDATE_MOV,
    payload: {
      dir,
      val,
    },
  }
}

const playerUpdateTurretAngle = dir => {
  emitTurretAngleChange(dir)
  return {
    type: actions.PLAYER_UPDATE_TURRET,
    payload: {
      dir,
    },
  }
}

export {
  actions,
  playerUpdatePosition,
  playerUpdateMovement,
  playerUpdateTurretAngle,
}
