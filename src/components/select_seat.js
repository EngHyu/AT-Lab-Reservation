import React, { Component } from 'react';
import { FormGroup, Col, Row, Button, Input, ButtonGroup } from 'reactstrap';
import styles from './select_seat.module.css';

class Seat extends Component {
  render() {
    const {
      id
    } = this.props;
    return (
      <Button color="primary" block={true} className="seat-btn">
        <Input type="radio" name="" id={"jb-radio" + id} />{id}
      </Button>
    );
  }
}

class X513 extends Component {
  render() {
    console.log(styles);
    return (
      <div>
        <Row className="pb-3" noGutters={true}>
          <Button outline={true} block={true} className={styles.seat} disabled>Screen Side</Button>
        </Row>
        <Row className={styles.row} data-toggle="buttons">
          {[...Array(8).keys()].map(num =>
            <Col className={`btn-group-toggle ${styles.col}`} key={num}>
              {[...Array(6).keys()].map(ele =>
                <Seat id={num * 6 + ele + 1} key={num * 6 + ele + 1} />
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