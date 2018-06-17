import {
  emitMovementChange,
  emitTurretAngleChange,
  emitPositionChange,
  emitUpdate,
} from '/src/services/Sockets'

const actions = {
  INIT_PLAYER: 'player/INIT',
  PLAYER_UPDATE: 'player/R',
  PLAYER_UPDATE_POS: 'player/POS',
  PLAYER_UPDATE_MOV: 'player/MOV',
  PLAYER_UPDATE_TURRET: 'player/TURRET',
  PLAYER_SHOT: 'player/SHOT',
  INIT_OPPONENT: 'opponent/INIT',
  OPPONENT_UPDATE: 'opponent/R',
  OPPONENT_MOVEMENT: 'opponent/MOV',
  OPPONENT_POS: 'opponent/POS',
  OPPONENT_TURRET: 'opponent/TURRET',
  OPPONENT_SHOT: 'opponent/SHOT',
  HIT: 'HIT',
  HIT_END: 'HIT_END',
  SETTINGS_HOST: 'settings/HOST',
}

const playerUpdate = (x, y, dir) => {
  emitUpdate(x, y, dir)
  return {
    type: actions.PLAYER_UPDATE,
    payload: {
      x,
      y,
      dir,
    },
  }
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

const playerUpdateMovement = val =>
  // emitMovementChange(val)
  ({
    type: actions.PLAYER_UPDATE_MOV,
    payload: {
      val,
    },
  })

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

const opponentUpdate = (id, x, y, dir) => ({
  type: actions.OPPONENT_UPDATE,
  payload: {
    id,
    x,
    y,
    dir,
  },
})

const opponentUpdatePosition = (id, x, y) => ({
  type: actions.OPPONENT_POS,
  payload: {
    id,
    x,
    y,
  },
})

const opponentUpdateMovement = (id, val) => ({
  type: actions.OPPONENT_MOVEMENT,
  payload: {
    id,
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

const shotMade = id => ({
  type: actions.OPPONENT_SHOT,
  payload: { id, value: true },
})

const shotEnd = id => ({
  type: actions.OPPONENT_SHOT,
  payload: { id, value: false },
})

export {
  actions,
  boom,
  playerInit,
  changeHost,
  shotMade,
  shotEnd,
  playerUpdate,
  opponentUpdate,
  playerUpdatePosition,
  playerUpdateMovement,
  playerUpdateTurretAngle,
  opponentUpdateMovement,
  opponentUpdatePosition,
  opponentUpdateTurretAngle,
}
