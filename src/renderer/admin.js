import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AdminNavigation, UserTable, LogTable, ReservationTable } from '../components'

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
        {<AdminNavigation lang={lang} floor={floor} />}
        {<UserTable lang={lang} />}
        {<LogTable lang={lang} />}
        {<ReservationTable lang={lang} />}
      </div>
    )
  }
}