/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavLink } from 'reactstrap'

import { langs } from 'common/components'
import { NavigationStyle } from 'common/css'

// 언어 선택용 네비게이션 바
// src/static/strings 디렉토리의 파일 목록을 읽어와 표시합니다.
// 선택 시 App의 state를 변경합니다.
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
      <Nav className={NavigationStyle.nav}>
        {langs.map((ele, idx) => (
          <NavLink href="#" key={idx} onClick={this.handleClick}>
            <h4>{ele}</h4>
          </NavLink>
        ))}
      </Nav>
    )
  }
}