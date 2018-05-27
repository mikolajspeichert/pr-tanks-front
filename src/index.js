import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '/src/styled/utils/global-style'
import createStore from '/src/engine'

import Presentation from './presentation'

class App extends React.Component {
  render() {
    return <Presentation />
  }
}

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
