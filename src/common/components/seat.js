/*eslint-disable no-undef*/
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import React, { Component } from 'react'

import { EndUsePopup } from 'common/components'
import { SelectSeatStyle } from 'common/css'

class BasicSeat extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    seatNum: PropTypes.number.isRequired,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    handler: PropTypes.func,
  }

  static defaultProps = {
    active: false,
    disabled: false,
  }

  state = {
    active: false,
  }

  render() {
    const {
      type,
      seatNum,
      disabled,
    } = this.props

    const {
      active,
    } = this.state

    return (
      <Button
      tag='label'
      name='seatNum'
      value={seatNum}
      block={true}
      color={type}
      active={active}
      disabled={disabled}
      className={SelectSeatStyle.seat}
      onClick={this.handleClick}
      >
        {seatNum}
      </Button>
    )
  }
}

class PrimarySeat extends BasicSeat {
  static propTypes = {
    ...super.propTypes,
    activeNum: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }

  static defaultProps = {
    type: "primary",
    disabled: false,
  }

  handleClick = (event) => {
    const {
      handler,
    } = this.props
    
    handler({
      activeNum: parseInt(event.target.getAttribute('value')),
    })
    document.form.studentID.focus()
  }

  componentWillUpdate(nextProps) {
    if (this.props.activeNum === nextProps.activeNum)
      return false

    this.setState({
      active: nextProps.activeNum === nextProps.seatNum,
    })
  }
}

class SuccessSeat extends BasicSeat {
  static propTypes = {
    ...super.propTypes,
    roomNum: PropTypes.number.isRequired,
    strings: PropTypes.object.isRequired,
  }

  static defaultProps = {
    type: "success",
    active: false,
    disabled: false,
  }

  render() {
    return <EndUsePopup trigger={super.render()} props={this.props} />
  }
}

class DangerSeat extends BasicSeat {
  static defaultProps = {
    type: "danger",
    active: false,
    disabled: true,
  }
}

export default class Seat extends Component {
  static propTypes = {
    seat: PropTypes.exact({
      seatNum: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
    }),
    roomNum: PropTypes.number,
    activeNum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    strings: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    seat: {
      seatNum: 0,
      type: 0,
    }
  }

  render() {
    const {
      strings,
      roomNum,
      activeNum,
      handler,
    } = this.props

    const {
      seatNum,
      type,
    } = this.props.seat
    
    if (type === 0)
      return <PrimarySeat seatNum={seatNum} activeNum={activeNum} handler={handler} />

    else if (type === 1)
      return <SuccessSeat seatNum={seatNum} strings={strings} roomNum={roomNum} handler={handler} />
    
    else if (type === 2)
      return <DangerSeat seatNum={seatNum} />

    else
      console.error(`
        error in TABLE seat, COLUMN type:
        out of range: only 0 ~ 2 type
        `, 
        type
      )
  }
}