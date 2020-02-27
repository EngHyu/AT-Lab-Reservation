import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import PropTypes from 'prop-types'

const color = ["primary", "success", "danger"]
const type = ["reserve", "", "end"]
export default class Caution extends Component {
  static propTypes = {
    strings: PropTypes.shape({
      title: PropTypes.string.isRequired,
      warning: PropTypes.string.isRequired,
      warningTexts: PropTypes.array.isRequired,
      submit: PropTypes.exact({
        "reserve": PropTypes.string.isRequired,
        "end": PropTypes.string.isRequired,
      }).isRequired
    })
  }

  render () {
    const {
      warning,
      warningTexts,
      submit,
    } = this.props.strings

    return (
      <Row noGutters={true}>
        <Col md={{ size: 10, offset: 1 }}>
          <h4>{warning}</h4>
          <ol>
            {warningTexts.map(
              (ele, idx) => <li key={idx}>{ele}</li>
            )}
          </ol>
          <Button color={color[0]} block={true} >
            {submit[type[0]]}
          </Button>
        </Col>
      </Row>
    )
  }
}
