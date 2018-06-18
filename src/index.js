import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '/src/styled/utils/global-style'
import store from '/src/engine/store'
import preload from './preload'

import Presentation from './presentation'

class App extends React.Component {
  render() {
    return <Presentation />
  }
}

preload()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
