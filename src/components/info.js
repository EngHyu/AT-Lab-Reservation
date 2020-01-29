import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, FormGroup } from 'reactstrap'
import { StudentID, SeatID, SelectTime, Password } from '../components'

export default class Info extends Component {
  state = {
    startTime: '',
    endTime: '',
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    floor: PropTypes.number.isRequired,
    seatNum: PropTypes.number,
  }

  componentDidUpdate(prevProps, prevState) {
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
