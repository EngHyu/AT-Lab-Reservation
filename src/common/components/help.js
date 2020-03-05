import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import { SelectSeatStyle } from 'common/css'

export default class Help extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
  }

  render() {
    const {
      mac,
      monitor,
      tablet,
      publicSeat,
      reserved,
      unavailable,
    } = this.props.strings

    return (
      <Row noGutters={true}>
        <Col md={{ offset: 1 }} className={SelectSeatStyle.help}>
          <div>
            <Button color="primary" tag="label" />
            <label>{mac}</label>
          </div>
          <div>
            <Button color="info" tag="label" />
            <label>{monitor}</label>
          </div>
          <div>
            <Button color="warning" tag="label" />
            <label>{tablet}</label>
          </div>
          <div>
            <Button color="secondary" tag="label" />
            <label>{publicSeat}</label>
          </div>
          <div>
            <Button color="success" tag="label" />
            <label>{reserved}</label>
          </div>
          <div>
            <Button color="danger" tag="label" />
            <label>{unavailable}</label>
          </div>
        </Col>
      </Row>
    )
  }
}