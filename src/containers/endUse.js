import React, { Component } from 'react'
import { Col, Form, FormGroup, Button } from 'reactstrap'
import { SelectSeat, StudentID, SeatID, Password } from '../components'

export default class EndUse extends Component {
  render () {
    const type = 'modify'
    return (
      <Form className='tabPanel mt-5'>
        <SelectSeat name='사용 종료' />
        <FormGroup row>
          <Col md={{ size: 5, offset: 1 }}>
            <StudentID type={type} />
            <SeatID type={type} />
            <Password type={type} />
            <Button color='primary' block={true} className='mt-3'>사용 종료</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}