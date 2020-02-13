import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, /*FormGroup*/ } from 'reactstrap'
import { StudentID, SeatID, SelectTime, Password } from '../components'

export default class Info extends Component {
  static propTypes = {
    lang: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
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
      lang,
      mode,
      floor,
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
        <StudentID title={lang.studentID} mode={mode} handler={handler} />
        <SeatID title={lang.seatNum} activeNum={activeNum} seatNum={seatNum} />
        {
          floor === 5 &&
          <SelectTime type='start' value={startTime} /> &&
          <SelectTime type='end' value={endTime} />
        }
        <Password title={lang.password} />
      </Row>
    )
  }
}
