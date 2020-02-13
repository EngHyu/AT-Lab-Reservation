import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './App.global.css'

export default class Admin extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.exact({
        lang: PropTypes.string.isRequired,
        floor: PropTypes.string.isRequired,
      })
    })
  }

  render () {
    const {
      lang,
      floor,
    } = this.props.match.params

    return (
      <div>
        <Link to={`/${lang}/${floor}/user`}>back to User</Link>
      </div>
    )
  }
}