import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import User from "./user"
import Admin from "./admin"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/user/4" />
        <Route path="/user/:floor" render={(props) => <User {...props} floor={4} />} />
        <Route path="/admin" component={Admin} />
      </Router>
    )
  }
}