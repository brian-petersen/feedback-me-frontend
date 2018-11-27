import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Uploader from './components/Uploader'

import styles from './App.module.scss'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Uploader} />
        </Switch>
      </BrowserRouter>
    )
  }
}
