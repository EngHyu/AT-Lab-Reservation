import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, /*FormGroup*/ } from 'reactstrap'
import { StudentID, SeatID, SelectTime, Password } from '../components'

export default class Info extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
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
      mode,
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
        <StudentID mode={mode} handler={handler} />
        <SeatID activeNum={activeNum} seatNum={seatNum} />
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
