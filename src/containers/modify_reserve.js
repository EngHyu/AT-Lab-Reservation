import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Input } from 'reactstrap';
import { SearchID, Info, CancelOkBtn, ReserveTable, Feedback } from '../components';
import { validate, modify, getReservationList } from '../db/db';

export default class ModifyReserve extends Component {
  state = {
    status: "idle",
    st_id: "",
    seat_num: "",
    start_time: "",
    end_time: "",
    action: "",
    st_list: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state) === JSON.stringify(prevState))
      return false;

    getReservationList(this.state.seat_num, this.handler);
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
    modify(formData, this.handler);
  }

  render() {
    const {
      status,
      st_id,
      st_list,
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
            <ReserveTable st_list={st_list} />
          </Col>
        </Row>
      </div>
    );
  }
}