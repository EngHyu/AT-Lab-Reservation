import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import User from "./user"
import Admin from "./admin"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/en/user/4" />
        <Route path="/:lang/user/:floor" component={User} />
        <Route path="/:lang/admin" component={Admin} />
      </Router>
    )
  }
}