import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavLink } from 'reactstrap'
import * as strings from 'common/strings'

export default class Navigation extends Component {
  static propTypes = {
    handler: PropTypes.func.isRequired,
  }

  handleClick = (event) => {
    const {
      handler,
    } = this.props

    handler({
      lang: event.target.innerText
    })
  }

  render () {
    return (
      <Nav>
        {Object.keys(strings).map((ele, idx) => (
          <NavLink href="#" key={idx} onClick={this.handleClick}>
            {ele}
          </NavLink>
        ))}
      </Nav>
    )
  }
}