import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class SeatID extends Component {
  render() {
    const {
      type
    } = this.props;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          좌석 번호
        </InputGroupAddon>
        <Input name="seat_id" required />
      </InputGroup>
    );
  }
}