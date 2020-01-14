import React, { Component } from 'react';
import { Form, FormGroup, Col, Row } from 'reactstrap';
import SelectSeat from '../components/select_seat';
import Info from '../components/info';
import Caution from '../components/caution';
import { reserve } from '../db/db';
import crypto from 'crypto';

class Feedback extends Component {
  type = {
    idle: {
      className: "idle",
      text: ""
    },
    success: {
      className: "valid",
      text: "* 예약을 완료했습니다."
    },
    failed: {
      className: "invalid",
      text: "* 이미 예약하셨습니다."
    }
  }

  render() {
    const {
      status
    } = this.props;
    const {
      className,
      text
    } = this.type[status];
    return (
      <span className={className}>
        {text}
      </span>
    );
  }
}

export default class ReserveSeat extends Component {
  state = {
    status: "idle"
  }

  encrypt({ st_id, password }) {
    const hash = crypto.createHmac('sha256', st_id)
      .update(password)
      .digest('hex');
    return hash;
  }

  validate() {
    const formData = Object.values(reserve_seat)
      .reduce((arr, ele) => {
        try {
          arr[ele.name] = reserve_seat[ele.name].value;
        } catch {}
        return arr
      }, {});
    formData.password = this.encrypt(formData);
    reserve(formData, this.handler);
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.validate();
    setTimeout(
      ()=>this.handler({ status: "idle" }),
      5000
    );
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