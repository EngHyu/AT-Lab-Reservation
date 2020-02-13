import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import User from "./user"
import Admin from "./admin"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/ko/4/user" />
        <Route path="/:lang/:floor/user" component={User} />
        <Route path="/:lang/:floor/admin" component={Admin} />
      </Router>
    )
  }
}