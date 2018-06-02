const WEBSOCKETS_PORT = 3001
class Sockets {
  init() {
    const socketUrl = `ws://localhost:${WEBSOCKETS_PORT}`
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

  on(eventName, listener) {
    this.socket.onmessage = listener
  }

  emit(eventName, data) {
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
