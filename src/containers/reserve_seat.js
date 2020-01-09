import React, { Component } from 'react';
import { Form, FormGroup, Col, Row } from 'reactstrap';
import SelectSeat from '../components/select_seat';
import Info from '../components/info';
import Caution from '../components/caution';

export default class ReserveSeat extends Component {
  render() {
    return (
      <Form className="tab__panel mt-5">
        <SelectSeat name="좌석 예약" />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Row noGutters={true}>
              <h4>인적사항</h4>
            </Row>
            <Info type="input" />
          </Col>
          <Caution />
        </FormGroup>
      </Form>
    );
  }
}