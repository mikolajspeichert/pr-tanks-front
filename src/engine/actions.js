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
  SETTINGS_HOST: 'settings/HOST',
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

const playerInit = payload => ({
  type: actions.INIT_PLAYER,
  payload,
})

const opponentUpdatePosition = (id, x, y) => ({
  type: actions.OPPONENT_POS,
  payload: {
    id,
    x,
    y,
  },
})

const opponentUpdateMovement = (id, dir, val) => ({
  type: actions.OPPONENT_MOVEMENT,
  payload: {
    id,
    dir,
    val,
  },
})

const opponentUpdateTurretAngle = (id, dir) => ({
  type: actions.OPPONENT_TURRET,
  payload: {
    id,
    dir,
  },
})

const changeHost = (host, port) => ({
  type: actions.SETTINGS_HOST,
  payload: {
    host,
    port,
  },
})

const boom = (x, y) => ({
  type: actions.HIT,
  payload: { x, y, deg: Math.floor(Math.random() * 360) },
})

export {
  actions,
  boom,
  playerInit,
  changeHost,
  playerUpdatePosition,
  playerUpdateMovement,
  playerUpdateTurretAngle,
  opponentUpdateMovement,
  opponentUpdatePosition,
  opponentUpdateTurretAngle,
}
