import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './modules/shared/Layout.jsx'
import CreatePoll from './modules/poll/CreatePoll.jsx'

// issue is here ...
const rootRoute = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={CreatePoll} />
    </Route>
  </Router>
)

render(
  rootRoute,
  document.getElementById('app')
)
