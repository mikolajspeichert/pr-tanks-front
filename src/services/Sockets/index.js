import Sockets from './core'

const emitPositionChange = (x, y) => {
  Sockets.emit('p', `x:${x.toFixed(2)};y:${y.toFixed(2)}`)
}

const emitMovementChange = (dir, val) => {
  Sockets.emit('m', `d:${dir.toFixed(2)};v:${val.toFixed(2)}`)
}

const emitTurretAngleChange = angle => {
  Sockets.emit('t', `a:${angle.toFixed(2)}`)
}

export { emitMovementChange, emitPositionChange, emitTurretAngleChange }