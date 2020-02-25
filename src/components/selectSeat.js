import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Col, Row, Button, Input } from 'reactstrap'
import styles from './selectSeat.module.css'
import { getSeat } from '../db/db'

const color = ["primary", "success", "danger"]
class Seat extends Component {
  static propTypes = {
    seat: PropTypes.exact({
      seatNum: PropTypes.number.isRequired,
      available: PropTypes.number.isRequired,
    }),
    activeNum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    seat: {
      seatNum: 0,
      available: 0,
    }
  }

  handleClick = (event) => {
    const {
      handler,
    } = this.props

    const {
      available,
    } = this.props.seat

    handler({
      activeNum: parseInt(event.target.value),
      available: available,
    })
  }

  render() {
    const {
      activeNum,
    } = this.props

    const {
      seatNum,
      available,
    } = this.props.seat

    return (
      <Button
      tag='label'
      block={true}
      color={color[available]}
      className={styles.seat}
      active={seatNum === activeNum}
      disabled={available===2}>
        <Input
        type='radio'
        name='seatNum'
        value={seatNum} 
        onClick={this.handleClick}
        required/>{seatNum}
      </Button>
    )
  }
}

export default class SelectSeat extends Component {
  static propTypes = {
    roomNum: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    seat: PropTypes.arrayOf(
      PropTypes.exact({
        seatNum: PropTypes.number,
        available: PropTypes.number.isRequired,
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