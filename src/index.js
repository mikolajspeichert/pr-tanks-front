import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import Presentation from './presentation'
import './global.sass'

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
