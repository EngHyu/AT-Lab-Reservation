import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ReserveSeat, ModifyReserve, EndUse, Reserve, Modify, End } from '../containers'
import { ko, en } from '../strings'
import './App.global.css'

export default class App extends Component {
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
        {<Reserve floor={floor} lang={lang} />}
        {<Modify floor={floor} lang={lang} />}
        {<End floor={floor} lang={lang} />}
      </div>
      /*
        {<Reserve floor={floor} lang={ko.default} />}
        {<Modify floor={floor} lang={ko.default} />}
        {<End floor={floor} lang={ko.default} />}

        {<ReserveSeat floor={floor} />}
        {<ModifyReserve floor={floor} />}
        {<EndUse floor={floor} />}
      */
    )
  }
}