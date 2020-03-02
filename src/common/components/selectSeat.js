import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Col, Row, Button, Input } from 'reactstrap'

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
      PropTypes.exact({
        seatNum: PropTypes.number,
        type: PropTypes.number,
        info: PropTypes.string,
      })
    ).isRequired,
    activeSeat: PropTypes.shape({
      seatNum: PropTypes.number,
      info: PropTypes.string,
    }),
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    seat: [],
    activeNum: '',
  }

  componentDidMount() {
    const {
      roomNum,
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

    return (
      <FormGroup row className='mb-5'>
        <Col md={{ size: 10, offset: 1 }}>
          <Input type='hidden' name='roomNum' value={roomNum} />
          <Row className='pb-3' noGutters={true}>
            <Button outline={true} block={true} className={SelectSeatStyle.seat} tag='label' disabled>Screen Side</Button>
          </Row>
          <Row className={SelectSeatStyle.row}>
            {[...Array(8).keys()].map(num =>
              <Col className={`btn-group-toggle ${SelectSeatStyle.col}`} key={num}>
                {[...Array(6).keys()].map(ele => {
                    const id = num * 6 + ele
                    return (
                      <Seat
                        key={id}
                        seat={seat[id]}
                        strings={strings}
                        roomNum={roomNum}
                        activeSeat={activeSeat}
                        handler={handler} />
                    )
                  }
                )}
              </Col>
            )}
          </Row>
        </Col>
      </FormGroup>
    )
  }
}