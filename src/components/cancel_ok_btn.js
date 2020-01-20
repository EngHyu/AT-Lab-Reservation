import React, { Component } from 'react';
import { Col, FormGroup, Button, Input } from 'reactstrap';

export default class CancelOkBtn extends Component {
  state = {
    action: "modify",
  };

  handleClick = (event) => {
    this.setState({
      action: event.target.value,
    });
  }

  render() {
    const {
      cancel,
      ok,
    } = this.props;

    const {
      action,
    } = this.state;

    return (
      <FormGroup row className="two-btn mt-3">
        <Col md="6" className="btn-group-toggle">
          <Button color="danger" block={true} onMouseDown={this.handleClick} value={"cancel"}>
            {cancel}
          </Button>
        </Col>
        <Col md="6" className="btn-group-toggle">
          <Button color="primary" block={true} onMouseDown={this.handleClick} value={"modify"}>
            {ok}
          </Button>
        </Col>
        <Input type="hidden" name="action" value={action} onChange={()=>true} />
      </FormGroup>
    );
  }
}