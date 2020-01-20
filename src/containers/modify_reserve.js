import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Input } from 'reactstrap';
import { SearchID, Info, CancelOkBtn, ReserveTable, Feedback } from '../components';
import { validate, modify } from '../db/db';

export default class ModifyReserve extends Component {
  state = {
    status: "idle",
    st_id: "",
    seat_num: "",
    start_time: "",
    end_time: "",
    action: "",
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = validate(event.target);
    console.log(formData);
    modify(formData, this.handler);
    console.log(this.state.status);
    
  }

  render() {
    const {
      status,
      st_id,
    } = this.state;

    return (
      <div>
        <Row>
          <Col md={{ size: 'auto', offset: 1 }} className="mb-2">
            <h2>예약 취소/변경</h2>
            <Feedback status={status} />
          </Col>
        </Row>
        <Row md="12">
          <Col md={{ size: 5, offset: 1 }}>
            <SearchID handler={this.handler} />
            <Form className="tab__panel mt-3" name="modify_reserve" onSubmit={this.handleSubmit} >
              <Input type="hidden" name="st_id" value={st_id} onChange={()=>true} />
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