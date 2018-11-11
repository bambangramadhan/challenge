import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { Router } from 'react-router-dom'
import App from './containers/App'
import configureStore from './store'
import history from './history';

const store  = configureStore()

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
