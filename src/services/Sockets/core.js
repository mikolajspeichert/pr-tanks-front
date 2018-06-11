const WEBSOCKETS_PORT = 3000
const HOST = '25.68.227.122'
class Sockets {
  init(port = WEBSOCKETS_PORT) {
    const socketUrl = `ws://${HOST}:${port}`
    console.log('Init websockets on endpoint: ', socketUrl)
    this.socket = new WebSocket(socketUrl)
    this.socket.onopen = () => {
      this.socket.send('hello')
    }

    this.socket.onerror = event => {
      console.log('Error occured', event)
      setTimeout(this.init, 2000)
    }
    this.socket.onclose = event => console.log('Connection closed', event)
  }

  initWithPort(port) {
    this.socket.close()
    this.init(port)
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
