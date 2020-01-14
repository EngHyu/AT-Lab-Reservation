import React, { Component } from 'react';
import { Form, FormGroup, Col, Row } from 'reactstrap';
import SelectSeat from '../components/select_seat';
import Info from '../components/info';
import Caution from '../components/caution';
import { reserve } from '../db/db';
import crypto from 'crypto';

export default class ReserveSeat extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  encrypt({ st_id, password }) {
    const hash = crypto.createHmac('sha256', st_id)
      .update(password)
      .digest('hex');
    console.log(hash);
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
    reserve(formData);
  }

  render() {

    return (
      <Form className="tab__panel mt-5" name="reserve_seat">
        <SelectSeat name="좌석 예약" />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Row noGutters={true}>
              <h4>인적사항</h4>
            </Row>
            <Info type="input" />
          </Col>
          <Caution onClick={() => { this.validate(this.db) }} />
        </FormGroup>
      </Form>
    );
  }
}