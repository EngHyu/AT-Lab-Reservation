import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, /*FormGroup*/ } from 'reactstrap'
import { StudentID, SeatID, SelectTime } from '../components'
import { setting } from '../strings'

const {
  floor,
} = setting

export default class Info extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
  }

  state = {
    startTime: '',
    endTime: '',
  }

  // componentDidUpdate(prevProps) {
  //   const { state } = this.props
  //   if (state === undefined) return
    
  //   const { studentID } = state
  //   const prevStudentID = prevProps.state.studentID
    
  //   if (studentID === prevStudentID) return
  //   this.setState(state)
  // }

  render() {
    const {
      strings,
      handler,
    } = this.props

    const {
      activeNum,
      seatNum,
      startTime,
      endTime,
    } = this.props.state

    return (
      <Row noGutters={true}>
        <StudentID title={strings.studentID} handler={handler} />
        <SeatID strings={strings} activeNum={activeNum} seatNum={seatNum} />
        {
          floor === 5 &&
          <SelectTime type='start' value={startTime} /> &&
          <SelectTime type='end' value={endTime} />
        }
      </Row>
    )
  }
}
