const WEBSOCKETS_PORT = 3000
const HOST = 'localhost'
class Sockets {
  init() {
    const socketUrl = `ws://${HOST}:${WEBSOCKETS_PORT}`
    console.log('Init websockets on endpoint: ', socketUrl)
    this.socket = new WebSocket(socketUrl)
    this.socket.onopen = () => {
      this.socket.send('Hello!')
    }

    this.socket.onerror = event => {
      console.log('Error occured', event)
      setTimeout(this.init, 2000)
    }
    this.socket.onclose = event => console.log('Connection closed', event)
  }

  onEvent(listener) {
    this.socket.onmessage = listener
  }

  emit(data) {
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(data)
    }
  }
}

let webSocketsInstance

function getInstance() {
  return webSocketsInstance || (webSocketsInstance = new Sockets())
}

export default getInstance()
