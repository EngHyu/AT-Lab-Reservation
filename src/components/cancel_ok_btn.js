import React, { Component } from 'react';
import { Col, FormGroup, Button } from 'reactstrap';

export default class CancelOkBtn extends Component {
  render() {
    const {
      cancel,
      ok
    } = this.props;
    return (
      <FormGroup row className="two-btn mt-3">
        <Col md="6">
          <Button color="danger" block={true}>{cancel}</Button>
        </Col>
        <Col md="6">
          <Button color="primary" block={true}>{ok}</Button>
        </Col>
      </FormGroup>
    );
  }
}
