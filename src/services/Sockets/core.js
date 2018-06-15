class Sockets {
  host = ''
  port = 3000

  init(host, port) {
    this.host = host
    this.port = port
    const socketUrl = `ws://${this.host}:${this.port}`
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
    this.init(this.host, port)
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
