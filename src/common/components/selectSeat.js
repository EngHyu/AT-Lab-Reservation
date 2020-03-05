import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Col, Row, Input } from 'reactstrap'

import { getSeat } from 'common/db'
import { Seat } from 'common/components'
import { SelectSeatStyle } from 'common/css'

// db에서 좌석을 가져옵니다.
// props로 받아온 좌석 정보를 바탕으로 <Seat /> 버튼을 만듭니다.
// 버튼을 눌러 좌석을 선택할 수 있습니다.
export default class SelectSeat extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    roomNum: PropTypes.number.isRequired,
    seat: PropTypes.arrayOf(
      PropTypes.shape({
        reservable: PropTypes.number,
        roomNum: PropTypes.number,
        seatNum: PropTypes.number,
        type: PropTypes.number,
      })
    ).isRequired,
    activeSeat: PropTypes.shape({
      roomNum: PropTypes.number,
      type: PropTypes.number,
      seatNum: PropTypes.number,
    }),
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    seat: [],
    activeSeat: {
      seatNum: 0,
      type: 0,
      info: '',
    },
  }

  componentDidMount() {
    const {
      roomNum,
      handler,
    } = this.props
    
    getSeat(roomNum, handler)
  }

  handleClick(roomNum) {
    const {
      handler,
    } = this.props

    getSeat(roomNum, handler)
  }

  render() {
    const {
      seat,
      roomNum,
      strings,
      activeSeat,
      handler,
    } = this.props

    const {
      type,
    } = this.props.activeSeat

    return (
      <FormGroup row className='mb-5'>
        <Col md={{ size: 8, offset: 2 }} className={SelectSeatStyle.container}>
          <Input type='hidden' name='roomNum' value={activeSeat.roomNum} />
          <Input type='hidden' name='type' value={type} />
          <Row className={SelectSeatStyle.row}>
            {
              seat.map((ele, idx) => (
                <Seat
                  key={idx}
                  seat={ele}
                  strings={strings}
                  roomNum={roomNum}
                  activeSeat={activeSeat}
                  handler={handler} />
              ))
            }
          </Row>
        </Col>
      </FormGroup>
    )
  }
}