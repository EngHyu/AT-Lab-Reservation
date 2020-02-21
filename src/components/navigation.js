import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import * as strings from '../strings'

class Navigation extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    here: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
  }

  render () {
    const {
      lang,
      here,
      link,
      floor,
    } = this.props

    
    return (
      <Nav>
        {<NavItem>
          <Link
            className="nav-link"
            to={`/${lang}/${floor}/${link}`}
          >
            {link}
          </Link>
        </NavItem>}
        {Object.keys(strings).map((ele, idx) => (
          <NavItem key={idx}>
            <Link
              className="nav-link"
              to={`/${ele}/${floor}/${here}`}
            >
              {ele}
            </Link>
          </NavItem>
        ))}
      </Nav>
    )
  }
}

class UserNavigation extends Navigation {
  static defaultProps = {
    ...super.defaultProps,
    here: 'user',
    link: 'admin',
  }
}

class AdminNavigation extends Navigation {
  static defaultProps = {
    ...super.defaultProps,
    here: 'admin',
    link: 'user',
  }
}

export { UserNavigation, AdminNavigation }