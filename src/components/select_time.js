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

const timeType = {
  hour: {
    name: "hour",
    min: "09",
    max: "23"
  },
  minute: {
    name: "minute",
    min: "00",
    max: "59"
  }
}

class Time extends Input {
  onFocus = (event) => {
    event.target.select();
  }

  onChange = (event) => {
    const {
      timeType,
      handler
    } = this.props;
    const {
      max,
      name
    } = timeType;
    if (parseInt(event.target.value) > max) return;
    handler(name, event.target.value);
  }

  render() {
    const {
      prefix,
      timeType,
      value
    } = this.props;
    const {
      min,
      max
    } = timeType;
    const name = `${prefix}_${timeType.name}`;
    return (
      <Input type="number" min={min} max={max}
        aria-label={name}
        onFocus={this.onFocus}
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
    hour: timeType.hour.min,
    minute: timeType.minute.min
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
        <Time prefix={prefix} timeType={timeType.hour} handler={this.handler} value={hour} />
        <InputGroupAddon addonType="append" className="input-group-prepend">:</InputGroupAddon>
        <Time prefix={prefix} timeType={timeType.minute} handler={this.handler} value={minute} />
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