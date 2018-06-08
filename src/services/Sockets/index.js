import Sockets from './nativecore'

const emitPositionChange = (x, y) => {
  Sockets.emit(`p.${x.toFixed(2)};${y.toFixed(2)}`)
}

const emitMovementChange = (dir, val) => {
  Sockets.emit(`m.${dir.toFixed(2)};${val.toFixed(2)}`)
}

const emitTurretAngleChange = angle => {
  Sockets.emit(`t.${angle.toFixed(2)}`)
}

const emitShot = (posX, posY, dir) => {
  Sockets.emit(`s.${posX.toFixed(2)};${posY.toFixed(2)};${dir.toFixed(2)}`)
}

const listenOnMessage = message => {
  console.log(message)
}

const initListeners = () => {
  Sockets.onEvent(listenOnMessage)
}

export {
  emitMovementChange,
  emitPositionChange,
  emitTurretAngleChange,
  emitShot,
  initListeners,
}
