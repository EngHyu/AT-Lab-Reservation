import React, { Component } from 'react';
import { Form, FormGroup, Col, Row } from 'reactstrap';
import { SelectSeat, Feedback, Info, Caution } from '../components';
import { reserve, validate } from '../db/db';

export default class ReserveSeat extends Component {
  state = {
    status: "idle"
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = validate(event.target);
    reserve(formData, this.handler);
  }

  render() {
    const {
      status
    } = this.state;
    return (
      <Form className="tab__panel mt-5" name="reserve_seat" onSubmit={this.handleSubmit}>
        <SelectSeat name="좌석 예약" />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Row noGutters={true} className="space">
              <h4>인적사항</h4>
              <Feedback status={status} />
            </Row>
            <Info type="input" />
          </Col>
          <Caution />
        </FormGroup>
      </Form>
    );
  }
}