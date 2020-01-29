import React, { Component } from 'react'
import { Form, FormGroup, Col, Row } from 'reactstrap'
import { SelectSeat, Feedback, StudentID, SeatID, SelectTime, Password, Info, Caution } from '../components'
import { reserve, preprocess, initDB } from '../db/db'
import styles from '../components/selectSeat.module.css'

export default class ReserveSeat extends Component {
  state = {
    status: "idle",
    activeNum: -1,
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  handleSubmit = (event) => {
    const {
      floor
    } = this.props

    event.preventDefault()
    const formData = preprocess(event.target)
    reserve(formData, this.handler)
  }

  render() {
    // initDB()
    const {
      floor
    } = this.props

    const {
      status,
      activeNum,
    } = this.state
    
    const type = 'input'

    return (
      <Form className="tabPanel mt-5" name="reserve_seat" onSubmit={this.handleSubmit}>
        <SelectSeat name="좌석 예약" handler={this.handler} />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Row noGutters={true} className="space">
              <h4>인적사항</h4>
              <Feedback status={status} />
            </Row>
            
            <Row noGutters={true} className={styles.studentID}>
              <StudentID type={type} />
            </Row>

            <Info type={type} seatNum={activeNum} floor={floor} />
          </Col>
          <Caution />
        </FormGroup>
      </Form>
    )
  }
}