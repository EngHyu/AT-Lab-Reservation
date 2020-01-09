import React, { Component } from 'react';
import { Col, Row, Form, FormGroup } from 'reactstrap';
import StudentID from '../components/student_id';
import Info from '../components/info';
import CancelOkBtn from '../components/cancel_ok_btn';
import ReserveTable from '../components/reserve_table';

export default class ModifyReserve extends Component {
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
            <Form className="tab__panel">
              <FormGroup>
                <StudentID type="modify" />
              </FormGroup>
            </Form>

            <Form className="tab__panel mt-3">
              <Info type="modify" />
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