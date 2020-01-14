import React, { Component } from 'react';
import { Col, Row, Form, FormGroup } from 'reactstrap';
import SearchID from '../components/search_id';
import Info from '../components/info';
import CancelOkBtn from '../components/cancel_ok_btn';
import ReserveTable from '../components/reserve_table';

export default class ModifyReserve extends Component {
  state = {
    seat_num: null,
    start_time: null,
    end_time: null
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={{ size: 'auto', offset: 1 }} className="mb-2">
            <h2>예약 취소/변경</h2>
          </Col>
        </Row>
        <Row md="12">
          <Col md={{ size: 5, offset: 1 }}>
            <SearchID handler={this.handler} />
            <Form className="tab__panel mt-3">
              <Info type="modify" state={this.state} />
              <CancelOkBtn cancel="예약 취소" ok="예약 변경" />
            </Form>
          </Col>
          <Col md={{ size: 5 }}>
            <ReserveTable />
          </Col>
        </Row>
      </div>
    );
  }
}