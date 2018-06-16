import _ from 'lodash'

import store from '/src/engine/store'
import {
  playerInit,
  opponentUpdateTurretAngle,
  opponentUpdatePosition,
  opponentUpdateMovement,
} from '/src/engine/actions'

import Sockets from './core'

const getIntValue = string => parseInt(string.split(':')[1], 10)
const getFloatValue = string => parseFloat(string.split(':')[1])

const emitPositionChange = (x, y) => {
  Sockets.emit(`p,${x.toFixed(2)},${y.toFixed(2)}`)
}

const emitMovementChange = (dir, val) => {
  Sockets.emit(`m,${dir.toFixed(2)},${val.toFixed(2)}`)
}

const emitTurretAngleChange = angle => {
  Sockets.emit(`t,${angle.toFixed(2)}`)
}

const emitShot = (posX, posY, dir) => {
  Sockets.emit(`s,${posX.toFixed(2)},${posY.toFixed(2)},${dir.toFixed(2)}`)
}

const listenOnEvents = ({ data }) => {
  console.log(data)
  const pairs = data.split(',')
  const id = pairs[0].split('')[1]
  switch (data.charAt(0)) {
    case 'p': {
      store.dispatch(
        opponentUpdatePosition(id, parseFloat(pairs[1]), parseFloat(pairs[2]))
      )
      break
    }
    case 'm': {
      store.dispatch(
        opponentUpdateMovement(id, parseFloat(pairs[1]), parseFloat(pairs[2]))
      )
      break
    }
    case 't':
      store.dispatch(opponentUpdateTurretAngle(id, parseFloat(pairs[1])))
      break
    case 's':
      break
    case 'o':
      break
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
  initListeners,
  initSockets,
}
