import store from '/src/engine/store'
import {
  playerInit,
  opponentUpdateTurretAngle,
  opponentUpdateMovement,
  opponentUpdate,
  shotMade,
  shotEnd,
  boom,
  boomEnd,
  updateStats,
} from '/src/engine/actions'

import Sockets from './core'

const getIntValue = string => parseInt(string.split(':')[1], 10)

const emitUpdate = (x, y, dir, health) => {
  Sockets.emit(`u,${x.toFixed(1)},${y.toFixed(1)},${dir},${health}`)
}

const emitPositionChange = (x, y) => {
  Sockets.emit(`p,${x.toFixed(2)},${y.toFixed(2)}`)
}

const emitMovementChange = val => {
  Sockets.emit(`m,${val.toFixed(2)}`)
}

const emitTurretAngleChange = angle => {
  Sockets.emit(`t,${angle.toFixed(2)}`)
}

const emitDeath = id => {
  Sockets.emit(`d${id}`)
}

const emitShot = (posX, posY, dir) => {
  Sockets.emit(`s,${posX.toFixed(2)},${posY.toFixed(2)},${dir.toFixed(2)}`)
}

const listenOnEvents = ({ data }) => {
  console.log(data)
  const pairs = data.split(',')
  const id = pairs[0].split('').pop()
  switch (data.charAt(0)) {
    case 'm': {
      store.dispatch(opponentUpdateMovement(id, parseFloat(pairs[1])))
      break
    }
    case 't':
      store.dispatch(opponentUpdateTurretAngle(id, parseFloat(pairs[1])))
      break
    case 's':
      store.dispatch(shotMade(id))
      setTimeout(() => {
        store.dispatch(shotEnd(id))
      }, 300)
      break
    case 'u': {
      store.dispatch(
        opponentUpdate(
          id,
          parseFloat(pairs[1]),
          parseFloat(pairs[2]),
          parseFloat(pairs[3]),
          parseInt(pairs[4], 10)
        )
      )
      break
    }
    case 'b': {
      store.dispatch(
        boom(
          id,
          parseFloat(pairs[1]),
          parseFloat(pairs[2]),
          parseInt(pairs[3], 10)
        )
      )
      setTimeout(() => {
        store.dispatch(boomEnd())
      }, 500)
      break
    }
    case 'r': {
      const payload = {
        hullDir: parseInt(pairs[1], 10),
        turretDir: parseInt(pairs[2], 10),
        x: parseInt(pairs[3], 10),
        y: parseInt(pairs[4], 10),
        movVal: 0,
        health: 100,
        dead: false,
        isFiring: false,
      }
      store.dispatch(playerInit(payload))
      break
    }
    case 'k': {
      const payload = {
        '0': {
          kills: parseInt(pairs[1], 10),
          deaths: parseInt(pairs[2], 10),
        },
        '1': {
          kills: parseInt(pairs[3], 10),
          deaths: parseInt(pairs[4], 10),
        },
        '2': {
          kills: parseInt(pairs[5], 10),
          deaths: parseInt(pairs[6], 10),
        },
        '3': {
          kills: parseInt(pairs[7], 10),
          deaths: parseInt(pairs[8], 10),
        },
      }
      store.dispatch(updateStats(payload))
      break
    }
    default:
      break
  }
}

const initSockets = (host, port) => {
  Sockets.init(host, port)
}

const initListeners = onPrepared => {
  Sockets.onEvent(({ data }) => {
    let split = data.split(',')
    const payload = {
      id: split[1],
      hullDir: getIntValue(split[2]),
      turretDir: getIntValue(split[3]),
      x: getIntValue(split[4]),
      y: getIntValue(split[5]),
    }
    store.dispatch(playerInit(payload))
    Sockets.initWithPort(split[0])
    setTimeout(() => {
      Sockets.onEvent(listenOnEvents)
      onPrepared()
    }, 1000)
  })
}

export {
  emitMovementChange,
  emitPositionChange,
  emitTurretAngleChange,
  emitShot,
  emitUpdate,
  emitDeath,
  initListeners,
  initSockets,
}
