import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Form, /*FormGroup,*/ Input } from 'reactstrap'
import { SearchID, Info, CancelOkBtn, ReserveTable, Feedback } from '../components'
import { preprocess, modify, getReservationList } from '../db/db'

export default class ModifyReserve extends Component {
  static propTypes = {
    floor: PropTypes.number.isRequired,
  }
  
  state = {
    status: 'idle',
    studentID: '',
    seatNum: '',
    startTime: '',
    endTime: '',
    action: '',
    studentList: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state) === JSON.stringify(prevState))
      return false

    getReservationList(this.state.seatNum, this.handler)
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state,
    })
    console.log(state)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    modify(formData, this.handler)
  }

  render() {
    const {
      floor
    } = this.props

    const {
      status,
      studentID,
      studentList,
      seatNum,
    } = this.state

    const type = 'modify'

    return (
      <div>
        <Row>
          <Col md={{ size: 'auto', offset: 1 }} className='mb-2'>
            <h2>예약 취소/변경</h2>
            <Feedback status={status} />
          </Col>
        </Row>
        <Row md='12'>
          <Col md={{ size: 5, offset: 1 }}>
            <SearchID handler={this.handler} />
            <Form className='tabPanel mt-3' name='modifyReserve' onSubmit={this.handleSubmit} >
              <Input type='hidden' name='studentID' value={studentID} onChange={()=>true} />
              <Info type={type} floor={floor} seatNum={seatNum} />
              <CancelOkBtn cancel='예약 취소' ok='예약 변경' />
            </Form>
          </Col>
          {
            floor === 5 &&
            <Col md={{ size: 5 }}>
              <ReserveTable studentList={studentList} />
            </Col>
          }
        </Row>
      </div>
    )
  }
}