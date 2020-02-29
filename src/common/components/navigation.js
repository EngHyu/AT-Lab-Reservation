/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavLink } from 'reactstrap'
import { list } from 'common/components'

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
        {list.map((ele, idx) => (
          <NavLink href="#" key={idx} onClick={this.handleClick}>
            {ele}
          </NavLink>
        ))}
      </Nav>
    )
  }
}