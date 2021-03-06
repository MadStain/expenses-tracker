import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import App from './containers/App'
import Login from './containers/Login'
import CreateUser from './containers/CreateUser'
import { Router, Route, browserHistory } from 'react-router'

import initialState from './initialState'
import { checkAuthentication } from './actions/user_asyncActions.js'


import { AppContainer } from 'react-hot-loader'

require('./style/Bootstrap-v3.3.6.css')  /*eslint:ignore*/
require('./style/custom.css')  /*eslint:ignore*/

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware( thunkMiddleware ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.dispatch(checkAuthentication())
render(
  <AppContainer>
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={CreateUser} />
    </Router>
  </Provider>
  </AppContainer>,
  document.getElementById('root')
)
