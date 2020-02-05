import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.global.css'

export default class Admin extends Component {
  render () {
    return (
      <div>
        <Link to="/user/4">back to User</Link>
      </div>
    )
  }
}