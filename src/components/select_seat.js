import React, { Component } from 'react';
import { FormGroup, Col, Row, Button, Input, ButtonGroup } from 'reactstrap';
import styles from './select_seat.module.css';

class Seat extends Component {
  onClick = (event) => {
    const {
      id,
      handler
    } = this.props;
    handler("seat_num", id);
  }

  render() {
    const {
      id,
      seat_num
    } = this.props;
    return (
      <Button color="primary" block={true} className={styles.seat} tag="label" active={id === seat_num} >
        <Input type="radio" name="seat_num" value={id} onClick={this.onClick} required/>{id}
      </Button>
    );
  }
}

class X513 extends Component {
  state = {
    seat_num: 0
  }

  handler = (key, value) => {
    const state = {};
    state[key] = value;
    this.setState({
      ...this.state,
      ...state
    })
  }

  render() {
    const {
      seat_num
    } = this.state;
    return (
      <div>
        <Row className="pb-3" noGutters={true}>
          <Button outline={true} block={true} className={styles.seat} tag="label" disabled>Screen Side</Button>
        </Row>
        <Row className={styles.row}>
          {[...Array(8).keys()].map(num =>
            <Col className={`btn-group-toggle ${styles.col}`} key={num}>
              {[...Array(6).keys()].map(ele =>
                <Seat id={num * 6 + ele + 1} key={num * 6 + ele + 1} handler={this.handler} seat_num={seat_num} />
              )}
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default class SelectSeat extends Component {
  render() {
    const {
      name
    } = this.props;
    return (
      <FormGroup row className="mb-5">
        <Col md={{ size: 'auto', offset: 1 }} className="mb-2">
          <h2>{name}</h2>
        </Col>
        <Col md={{ size: 10, offset: 1 }}>
          <X513 />
        </Col>
      </FormGroup>
    );
  }
}