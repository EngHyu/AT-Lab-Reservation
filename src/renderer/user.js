import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { /*ReserveSeat, ModifyReserve, EndUse,*/ Reserve, Modify, End } from '../containers'
import * as strings from '../strings'
import './App.global.css'

export default class User extends Component {
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
      floor,
      lang,
    } = this.props.match.params
    
    return (
      <div>
        <Link to={`/${lang}/${floor}/admin`}>Admin</Link>
        {<Reserve floor={floor} lang={strings[lang]} />}
        {<Modify floor={floor} lang={strings[lang]} />}
        {<End floor={floor} lang={strings[lang]} />}
      </div>
    )
  }
}