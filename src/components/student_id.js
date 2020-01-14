import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { getPattern } from '../db/db'

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
  state = {
    pattern: ""
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  componentDidMount() {
    getPattern(this.handler);
  }

  render() {
    const { type } = this.props;
    const { pattern } = this.state;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          학번
        </InputGroupAddon>
        <Input name="st_id" pattern={pattern} title={"일치하는 사용자가 없습니다."} required />
        {type === "input" ? null : <Search />}
      </InputGroup>
    );
  }
}