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
        floor: PropTypes.number.isRequired,
        lang: PropTypes.object.isRequired,
      })
    })
  }

  static defaultProps = {
    match: {
      params: {
        floor: 4,
        lang: 'en',
      }
    }
  }

  render () {
    const {
      floor,
      lang,
    } = this.props.match.params
    
    return (
      <div>
        <Link to="/admin">Admin</Link>
        {<Reserve floor={floor} lang={strings[lang]} />}
        {<Modify floor={floor} lang={strings[lang]} />}
        {<End floor={floor} lang={strings[lang]} />}
      </div>
    )
  }
}