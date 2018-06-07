import Sockets from './nativecore'

const emitPositionChange = (x, y) => {
  Sockets.emit('p', `x:${x.toFixed(2)};y:${y.toFixed(2)}`)
}

const emitMovementChange = (dir, val) => {
  Sockets.emit('m', `d:${dir.toFixed(2)};v:${val.toFixed(2)}`)
}

const emitTurretAngleChange = angle => {
  Sockets.emit('t', `a:${angle.toFixed(2)}`)
}

const emitShot = (posX, posY, dir) => {
  Sockets.emit(
    's',
    `x:${posX.toFixed(2)};y:${posY.toFixed(2)};d:${dir.toFixed(2)}`
  )
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
