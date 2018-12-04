import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Uploader from './components/Uploader'
import Feedback from './components/Feedback'

import styles from './App.module.scss'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Uploader} />
          <Route path="/feedback/:key" component={Feedback} />
        </Switch>
      </BrowserRouter>
    )
  }
}
