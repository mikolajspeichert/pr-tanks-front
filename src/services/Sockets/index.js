import io from 'socket.io-client'

const WEBSOCKETS_PORT = 3001
class Sockets {
  init() {
    const socketUrl = `http://localhost:${WEBSOCKETS_PORT}`
    console.log('Init websockets on endpoint: ', socketUrl)
    this.socket = io(socketUrl, {
      transports: ['websocket'],
    })
    this.socket.on('connect_error', error => {
      console.log('Error while connecting', error)
    })
  }

  on(eventName, listener) {
    this.socket.on(eventName, listener)
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data)
  }
}

let webSocketsInstance

function getInstance() {
  return webSocketsInstance || (webSocketsInstance = new Sockets())
}

export default getInstance()
