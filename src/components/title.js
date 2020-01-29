import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

export default class Title extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const {
      title,
    } = this.props

    return (
      <Row noGutters={true}>
        <Col md={{ size: 12, offset: 1 }}>
          <h2>{title}</h2>
        </Col>
      </Row>
    )
  }
}