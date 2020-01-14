import React, { Component } from 'react';
import { Row } from 'reactstrap';
import StudentID from './student_id';
import SeatID from './seat_id';
import SelectTime from './select_time';
import Password from './password';

export default class Info extends Component {
  render() {
    const {
      type,
      state
    } = this.props;

    if (state === undefined) {
      state["seat_num"] = "";
      state["start_time"] = "";
      state["end_time"] = "";
    }

    const input = {
      "input": <StudentID type={type} />,
      "modify": <SeatID value={state.seat_num} />
    }
    return (
      <Row noGutters={true}>
        { input[type] }
        <SelectTime type="start" value={state.start_time} />
        <SelectTime type="end" value={state.end_time} />
        <Password type={type} />
      </Row>
    );
  }
}