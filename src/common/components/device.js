import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
// import { settings } from 'common/components'

export default class Device extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    activeSeat: PropTypes.shape({
      roomNum: PropTypes.number,
      type: PropTypes.number,
      seatNum: PropTypes.number,
    }),
  }

  static defaultProps = {
    activeSeat: {
      roomNum: 0,
      type: 0,
      seatNum: 0,
    }
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state,
    })
  }

  getList(seat, strings) {
    if (seat.info === undefined) {
      return <li>{strings.noInfo}</li>
    }
    if (seat.info === "") {
      return <li>{strings.noInfo}</li>
    }
    return seat.info.split(", ").map(
      (ele, idx)=>(<li key={idx}>{ele}</li>)
    )
  }

  render() {
    const {
      strings,
      activeSeat,
    } = this.props

    const {
      seatNum,
    } = activeSeat

    const subtitle = seatNum > 0 ? ` - ${seatNum}` : null
    const list = this.getList(activeSeat, strings)

    return (
      <Col md={{ size: 5 }}>
        <h4>
          {strings.title}
          {subtitle}
        </h4>
        <ul>{list}</ul>
      </Col>
    )
  }
}