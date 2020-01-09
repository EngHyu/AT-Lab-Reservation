import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class Search extends Component {
  render() {
    return (
      <InputGroupAddon addonType="append">
        <Button>검색</Button>
      </InputGroupAddon>
    );
  }
}

export default class StudentID extends Component {
  render() {
    const {
      type
    } = this.props;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          학번
        </InputGroupAddon>
        <Input required />
        {type === "input" ? null : <Search/> }
      </InputGroup>
    );
  }
}