import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, /*FormGroup*/ } from 'reactstrap'
import { StudentID, SeatID, SelectTime, Password } from '../components'

export default class Info extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    floor: PropTypes.number.isRequired,
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
      type,
      floor,
      handler,
    } = this.props

    const {
      activeNum,
      seatNum,
    } = this.props.state

    const {
      startTime,
      endTime,
    } = this.state

    return (
      <Row noGutters={true}>
        <StudentID type={type} handler={handler} />
        <SeatID type={type} activeNum={activeNum} seatNum={seatNum} />
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
