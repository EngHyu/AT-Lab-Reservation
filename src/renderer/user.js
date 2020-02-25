import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserNavigation } from '../components'
import { General } from '../containers'
import * as strings from '../strings'

export default class User extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.exact({
        lang: PropTypes.string,
      })
    })
  }

  render () {
    const {
      lang,
    } = //this.props.match.params
    { lang:'ko' }

    return (
      <div>
        {<UserNavigation lang={lang} />}
        {<General strings={strings[lang]} />}
      </div>
    )
  }
}