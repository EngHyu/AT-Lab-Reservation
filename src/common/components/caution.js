import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import PropTypes from 'prop-types'

// 주의 사항을 표시하고 예약 버튼을 표시합니다.
export default class Caution extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    strings: PropTypes.shape({
      title: PropTypes.string.isRequired,
      texts: PropTypes.array.isRequired,
      submit: PropTypes.string.isRequired,
    })
  }

  static defaultProps = {
    color: "primary",
  }

  render () {
    const {
      color,
    } = this.props

    const {
      title,
      texts,
      submit,
    } = this.props.strings

    return (
      <Row noGutters={true}>
        <Col md={{ size: 10, offset: 1 }}>
          <h4>{title}</h4>
          <ol>
            {texts.map(
              (ele, idx)=><li key={idx}>{ele}</li>
            )}
          </ol>
          <Button color={color} block={true} >
            {submit}
          </Button>
        </Col>
      </Row>
    )
  }
}
