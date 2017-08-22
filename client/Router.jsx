import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './modules/shared/Layout.jsx'
import CreatePoll from './modules/poll/CreatePoll.jsx'
import VotePoll from './modules/poll/VotePoll.jsx'
import ResultPoll from './modules/poll/ResultPoll.jsx'

const rootRoute = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={CreatePoll} />
      <Route path='v' component={VotePoll} />
      <Route path='r' component={ResultPoll} />
    </Route>
  </Router>
)

render(
  rootRoute,
  document.getElementById('app')
)
