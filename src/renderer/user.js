import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { /*ReserveSeat, ModifyReserve, EndUse,*/ Reserve, Modify, End } from '../containers'
import { ko, /*en*/ } from '../strings'
import './App.global.css'

export default class User extends Component {
  static propTypes = {
    floor: PropTypes.number.isRequired,
  }

  state = {
    lang: ko,
  }

  render () {
    const {
      floor,
    } = this.props

    const {
      lang,
    } = this.state

    return (
      <div>
        <Link to="/admin">Admin</Link>
        {<Reserve floor={floor} lang={lang} />}
        {<Modify floor={floor} lang={lang} />}
        {<End floor={floor} lang={lang} />}
      </div>
    )
  }
}