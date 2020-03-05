/*eslint-disable no-undef*/
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import React, { Component } from 'react'

import { EndUsePopup, } from 'common/components'
import { SelectSeatStyle } from 'common/css'

// 모든 좌석의 바탕이 되는 기본 좌석 컴포넌트
class BasicSeat extends Component {
  static propTypes = {
    seat: PropTypes.object.isRequired,
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

  // 435가 너무 넓어서 같은 width를 적용할 수 없음...
  // transform: scale(0.8, 1) 적용하니까 레이아웃 깨지고 팝업 이상해짐...
  // 어쩔 수 없이 하나하나 수정 및 css 하드코딩 했습니다...
  getClassName({ isVertical, isDouble, roomNum }) {
    let style = "seat"
    style += isVertical ? "Vertical" : "Horizontal"
    style += isDouble ? "Double" : ""
    style += roomNum === 435 ? roomNum : ""
    return `${SelectSeatStyle[style]} ${SelectSeatStyle.seat}`
  }

  getColor({ type, reservable }) {
    switch(reservable) {
      case 1:
        return "success"
      case 2:
        return "danger"
    }

    switch (type) {
      case 0:
        return "primary"
      case 1:
        return "info"
      case 2:
        return "warning"
      case 3:
        return "secondary"
    }
  }

  render() {
    const {
      seat,
      disabled,
    } = this.props

    const {
      seatNum,
    } = this.props.seat

    const {
      active,
    } = this.state

    const color = this.getColor(seat)
    const className = this.getClassName(seat)

    return (
      <Button
      tag='label'
      name='seatNum'
      value={seatNum}
      color={color}
      active={active}
      disabled={disabled}
      className={className}
      onClick={this.handleClick}
      style={seat}
      >
        {seatNum}
      </Button>
    )
  }
}

// 예약 가능한 좌석
// 파란색으로 표시됩니다.
// activeSeat.seatNum은 선택된 좌석의 번호를 의미합니다.
// seatNum과 activeSeat.seatNum이 같다면 해당 좌석을 active로 표시합니다.
// 어떤 좌석을 눌렀는지 표시를 유지하기 위해서 입니다.
// 좌석을 누르면 바로 학번 입력창으로 focus를 옮깁니다.
class ReservableSeat extends BasicSeat {
  static propTypes = {
    ...super.propTypes,
    activeSeat: PropTypes.shape({
      roomNum: PropTypes.number,
      type: PropTypes.number,
      seatNum: PropTypes.number,
    }),
  }

  static defaultProps = {
    ...super.defaultProps,
    reservable: 0,
  }

  handleClick = () => {
    const {
      seat,
      handler,
    } = this.props
    
    handler({
      activeSeat: seat,
    })
    document.form.studentID.focus()
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeSeat === undefined)
      return false

    if (this.props.activeSeat.seatNum === nextProps.activeSeat.seatNum)
      return false

    const type = nextProps.type === nextProps.activeSeat.type
    const seatNum = nextProps.activeSeat.seatNum === nextProps.seatNum
    this.setState({
      active: type && seatNum,
    })
  }
}

// 예약된 좌석
// 초록색으로 표시됩니다.
// 누르면 예약 종료 팝업이 표시됩니다.
// 예약 종료 기능을 위해 roomNum 속성이 필요합니다.
// 팝업 문구 표시를 위해 strings 오브젝트가 필요합니다.
// 좌석을 누르면 바로 패스워드(학번) 입력창으로 focus를 옮깁니다.
class ReservedSeat extends BasicSeat {
  static propTypes = {
    ...super.propTypes,
    strings: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...super.defaultProps,
    reservable: 1,
  }

  render() {
    return <EndUsePopup trigger={super.render()} props={this.props} />
  }
}

// 관리자가 사용 불가 지정한 좌석
// 빨간색으로 표시됩니다.
// 누를 수 없습니다.
class UnableSeat extends BasicSeat {
  static defaultProps = {
    ...super.defaultProps,
    reservable: 2,
    disabled: true,
  }
}

// 좌석 type에 따라 다른 seat를 렌더합니다.
export default class Seat extends Component {
  static propTypes = {
    seat: PropTypes.object,
    roomNum: PropTypes.number,
    activeSeat: PropTypes.shape({
      seatNum: PropTypes.number,
      info: PropTypes.string,
    }),
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
      seat,
      handler,
      strings,
      activeSeat,
    } = this.props

    const {
      type,
      reservable,
    } = this.props.seat
    
    switch (type) {
      case 3:
        return <UnableSeat seat={{ ...seat, reservable: 0, }} />
    }

    switch (reservable) {
      case 0:
        return <ReservableSeat seat={seat} activeSeat={activeSeat} handler={handler} />

      case 1:
        return <ReservedSeat seat={seat} strings={strings} handler={handler} />
      
      case 2:
        return <UnableSeat seat={seat} />

      default:
        throw (`
          error in TABLE seat, COLUMN type:
          out of range: only 0 ~ 2 type
          `, 
          type
        )
    }
  }
}