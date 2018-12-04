import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Feedback from './components/Feedback.1'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feedback/:key" component={Feedback} />
        </Switch>
      </BrowserRouter>
    )
  }
}
