import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserNavigation } from '../components'
import { Reserve, Modify, End } from '../containers'
import * as strings from '../strings'

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
        {<UserNavigation lang={lang} floor={floor} />}
        {<Reserve lang={strings[lang]} floor={floor} />}
        {<Modify lang={strings[lang]} floor={floor} />}
        {<End lang={strings[lang]} floor={floor} />}
      </div>
    )
  }
}