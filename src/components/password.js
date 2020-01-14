import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class Password extends Component {
  render() {
    const {
      type
    } = this.props;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          비밀번호
        </InputGroupAddon>
        <Input type="password" name="password" required />
        <InputGroupAddon addonType="append">
          <i className="fa fa-eye-slash" aria-hidden="true"></i>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}