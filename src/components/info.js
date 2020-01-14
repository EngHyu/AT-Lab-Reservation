import React, { Component } from 'react';
import { Row } from 'reactstrap';
import StudentID from './student_id';
import SeatID from './seat_id';
import SelectTime from './select_time';
import Password from './password';

export default class Info extends Component {
  render() {
    const {
      type
    } = this.props;
    return (
      <Row noGutters={true}>
        { type === "input" ? <StudentID type={type} /> : <SeatID /> }
        <SelectTime type="start" />
        <SelectTime type="end" />
        <Password type={type} />
      </Row>
    );
  }
}