import React, { useState, Component } from 'react';
import { InputGroup, InputGroupAddon, Input, ButtonGroup, Button } from 'reactstrap';

const property = {
  start: {
    name: "시작 시간",
    prefix: "start"
  },
  end: {
    name: "종료 시간",
    prefix: "end"
  }
}

class Time extends Input {
  onChange = (e) => {
    const {
      max,
      type,
      handler
    } = this.props;
    
    if (parseInt(e.target.value) > max) return;
    handler(type, e.target.value);
  }

  render() {
    const {
      max,
      prefix,
      type,
      value
    } = this.props;
    const name = `${prefix}_${type}`;
    return (
      <Input type="number" min="00" max={max}
        aria-label={name}
        onChange={this.onChange}
        className="time"
        value={value}
        required />
    );
  }
}

export default class SelectTime extends Component {
  state = {
    ...property['start'],
    hour: "00",
    minute: "00"
  }

  componentDidMount() {
    const {
      type
    } = this.props;

    this.setState({
      ...this.state,
      ...property[type],
    });
  }

  handler = (key, value) => {
    const state = {};
    state[key] = parseInt(value).toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
    this.setState({
      ...this.state,
      ...state
    });
  }

  handleHour = (num) => {
    this.handler("hour", (12 + parseInt(this.state.hour)) % num);
  }

  render() {
    const {
      name,
      prefix,
      hour,
      minute
    } = this.state;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          {name}
        </InputGroupAddon>
        <Time max={23} prefix={prefix} type="hour" handler={this.handler} value={hour} />
        <InputGroupAddon addonType="append" className="input-group-prepend">:</InputGroupAddon>
        <Time max={59} prefix={prefix} type="minute" handler={this.handler} value={minute} />
        <Input type="hidden" name={prefix} value={`${hour}:${minute}`} readOnly />
        <InputGroupAddon addonType="append">
          <ButtonGroup className="btn-group-toggle">
            <Button color="outline-secondary" tag="label" active={hour < 12}>
              <Input type="radio" onClick={()=>this.handleHour(12)} />AM
            </Button>
            <Button color="outline-secondary" tag="label" active={hour >= 12}>
              <Input type="radio" onClick={()=>this.handleHour(24)} />PM
            </Button>
          </ButtonGroup>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}