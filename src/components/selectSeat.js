import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Col, Row, Button, Input } from 'reactstrap'
import styles from './selectSeat.module.css'
import { getSeat } from '../db/db'

class Seat extends Component {
  static propTypes = {
    seat: PropTypes.exact({
      seatNum: PropTypes.number.isRequired,
      available: PropTypes.number.isRequired,
    }),
    activeNum: PropTypes.number.isRequired,
    reverseSelect: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
    superHandler: PropTypes.func.isRequired,
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
      superHandler,
    } = this.props

    const state = {
      activeNum: parseInt(event.target.value),
    }
    superHandler(state)
    handler(state)
  }

  render() {
    const {
      activeNum,
      reverseSelect,
    } = this.props

    const {
      seatNum,
      available,
    } = this.props.seat

    return (
      <Button
      tag='label'
      block={true}
      color='primary'
      className={styles.seat}
      disabled={Boolean(reverseSelect ^ !available)}
      active={seatNum === activeNum}>
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

class ClassRoom extends Component {
  static propTypes = {
    roomNum: PropTypes.number.isRequired,
    reverseSelect: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
  }

  state = {
    seat: [],
    activeNum: -1,
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  constructor(props) {
    super(props)
    getSeat(props.roomNum, this.handler)
  }

  render() {
    const {
      roomNum,
      reverseSelect,
      handler,
    } = this.props

    const {
      seat,
      activeNum,
    } = this.state

    getSeat(roomNum, this.handler)

    return (
      <div>
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
                      reverseSelect={reverseSelect}
                      handler={this.handler}
                      superHandler={handler} />
                  )
                }
              )}
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

export default class SelectSeat extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  }

  state = {
    reverseSelect: false,
  }

  componentDidMount() {
    const {
      mode,
    } = this.props

    this.setState({
      reverseSelect: mode === "end"
    })
  }

  render() {
    const {
      handler,
    } = this.props
    
    const {
      reverseSelect
    } = this.state

    return (
      <FormGroup row className='mb-5'>
        <Col md={{ size: 10, offset: 1 }}>
          <ClassRoom roomNum={513} reverseSelect={reverseSelect} handler={handler} />
        </Col>
      </FormGroup>
    )
  }
}