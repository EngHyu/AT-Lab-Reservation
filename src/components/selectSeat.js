import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Col, Row, Button, Input } from 'reactstrap'

import { getSeat } from '../db/db'
import styles from './selectSeat.module.css'
import { Seat } from '../components'

export default class SelectSeat extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
    roomNum: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    seat: PropTypes.arrayOf(
      PropTypes.exact({
        seatNum: PropTypes.number,
        type: PropTypes.number.isRequired,
      })
    ).isRequired,
    activeNum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
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
      activeNum,
      handler,
    } = this.props

    return (
      <FormGroup row className='mb-5'>
        <Col md={{ size: 10, offset: 1 }}>
          <Input type='hidden' name='roomNum' value={roomNum} />
          <Row className='pb-3' noGutters={true}>
            <Button outline={true} block={true} className={styles.seat} tag='label' disabled>Screen Side</Button>
          </Row>
          <Row className={styles.row}>
            {[...Array(8).keys()].map(num =>
              <Col className={`btn-group-toggle ${styles.col}`} key={num}>
                {[...Array(6).keys()].map(ele => {
                    const id = num * 6 + ele
                    return (
                      <Seat
                        key={id}
                        seat={seat[id]}
                        strings={strings}
                        roomNum={roomNum}
                        activeNum={activeNum}
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