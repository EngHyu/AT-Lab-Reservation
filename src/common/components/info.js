import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { StudentID, SeatID } from 'common/components'

export default class Info extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
  }

  render() {
    const {
      strings,
      handler,
    } = this.props

    const {
      activeNum,
      seatNum,
    } = this.props.state

    return (
      <Row noGutters={true}>
        <StudentID title={strings.studentID} handler={handler} />
        <SeatID strings={strings} activeNum={activeNum} seatNum={seatNum} />
      </Row>
    )
  }
}
