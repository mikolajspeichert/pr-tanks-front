import {
  emitTurretAngleChange,
  emitUpdate,
  emitDeath,
} from '/src/services/Sockets'

const actions = {
  INIT_PLAYER: 'player/INIT',
  DEATH: 'player/DEATH',
  PLAYER_UPDATE: 'player/R',
  PLAYER_UPDATE_POS: 'player/POS',
  PLAYER_UPDATE_MOV: 'player/MOV',
  PLAYER_UPDATE_TURRET: 'player/TURRET',
  PLAYER_SHOT: 'player/SHOT',
  OPPONENT_UPDATE: 'opponent/R',
  OPPONENT_POS: 'opponent/POS',
  OPPONENT_TURRET: 'opponent/TURRET',
  OPPONENT_SHOT: 'opponent/SHOT',
  HIT: 'HIT',
  HIT_END: 'HIT_END',
  SETTINGS_HOST: 'settings/HOST',
  SETTINGS_STATS: 'settings/STATS',
}

const playerUpdate = (x, y, dir, health) => {
  emitUpdate(x, y, dir, health)
  return {
    type: actions.PLAYER_UPDATE,
    payload: {
      x,
      y,
      dir,
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

const opponentUpdate = (id, x, y, dir, health) => ({
  type: actions.OPPONENT_UPDATE,
  payload: {
    id,
    x,
    y,
    dir,
    health,
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

const boom = (id, x, y, shooterId) => ({
  type: actions.HIT,
  payload: { id, x, y, deg: Math.floor(Math.random() * 360), shooterId },
})

const boomEnd = () => ({
  type: actions.HIT_END,
})

const shotMade = id => ({
  type: actions.OPPONENT_SHOT,
  payload: { id, value: true },
})

const shotEnd = id => ({
  type: actions.OPPONENT_SHOT,
  payload: { id, value: false },
})

const death = shooterId => {
  emitDeath(shooterId)
  return {
    type: actions.DEATH,
  }
}

const updateStats = payload => ({
  type: actions.SETTINGS_STATS,
  payload,
})

export {
  actions,
  death,
  boom,
  boomEnd,
  playerInit,
  changeHost,
  shotMade,
  shotEnd,
  playerUpdate,
  opponentUpdate,
  updateStats,
  playerUpdateMovement,
  playerUpdateTurretAngle,
  opponentUpdateMovement,
  opponentUpdateTurretAngle,
}
