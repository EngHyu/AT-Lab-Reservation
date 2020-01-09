import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, ButtonGroup, Button } from 'reactstrap';

export default class SelectTime extends Component {
  render() {
    const {
      name
    } = this.props;
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          {name}
        </InputGroupAddon>
        <Input type="number" className="form-control" aria-label="End-Hour" aria-describedby="basic-addon4" min="00" max="59" required />
        <InputGroupAddon addonType="append" className="input-group-prepend">:</InputGroupAddon>
        <Input type="number" className="form-control" aria-label="End-Minute" aria-describedby="basic-addon4" min="00" max="59" required />
        <InputGroupAddon addonType="append">
          <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
            <Button color="outline-secondary">
              <Input type="radio" name="jb-radio" id="jb-radio-1"/>AM
            </Button>
            <Button color="outline-secondary">
              <Input type="radio" name="jb-radio" id="jb-radio-1" />PM
            </Button>
          </ButtonGroup>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}