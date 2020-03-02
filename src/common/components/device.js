import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'

export default class Device extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    activeSeat: PropTypes.shape({
      seatNum: PropTypes.number,
      info: PropTypes.string,
    }),
  }

  static defaultProps = {
    activeSeat: {
      seatNum: 0,
      info: "",
    }
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state,
    })
  }

  render() {
    const {
      strings,
    } = this.props

    const {
      info,
      seatNum,
    } = this.props.activeSeat

    return (
      <Col md={{ size: 5 }}>
        <h4>
          {strings.title}
          {
            seatNum > 0 &&
            ` - ${seatNum}`
          }
        </h4>
        <ul>
          {
            info === "" &&
            <li>{strings.noInfo}</li>
          }
          {
            info !== "" &&
            info.split("\\n").map(
              (ele, idx)=>(<li key={idx}>{ele}</li>)
            )
          }
        </ul>
      </Col>
    )
  }
}