import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, /*FormGroup*/ } from 'reactstrap'
import { StudentID, SearchID, SeatID, SelectTime, Password } from '../components'

export default class Info extends Component {
  static propTypes = {
    state: PropTypes.oneOf([
      PropTypes.undefined,
      PropTypes.exact({
        studentID: PropTypes.string.isRequired,
      }),
    ]),
    type: PropTypes.string.isRequired,
    floor: PropTypes.number.isRequired,
    seatNum: PropTypes.number,
  }

  state = {
    startTime: '',
    endTime: '',
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props
    if (state === undefined) return
    
    const { studentID } = state
    const prevStudentID = prevProps.state.studentID
    
    if (studentID === prevStudentID) return
    this.setState(state)
  }

  render() {
    const {
      type,
      floor,
      seatNum,
    } = this.props

    const {
      startTime,
      endTime,
    } = this.state

    return (
      <Row noGutters={true}>
        {
          type === "input" ?
          <StudentID /> :
          <SearchID />
        }
        <SeatID type={type} value={seatNum} />
        {
          floor === 5 &&
          <SelectTime type='start' value={startTime} /> &&
          <SelectTime type='end' value={endTime} />
        }
        <Password />
      </Row>
    )
  }
}
