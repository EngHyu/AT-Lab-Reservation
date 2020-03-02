/*eslint-disable no-undef*/
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import React, { Component } from 'react'

import { EndUsePopup } from 'common/components'
import { SelectSeatStyle } from 'common/css'

// 모든 좌석의 바탕이 되는 기본 좌석 컴포넌트
class BasicSeat extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
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
      color,
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
      color={color}
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
      seatNum: PropTypes.number,
      info: PropTypes.string,
    }),
  }

  static defaultProps = {
    ...super.defaultProps,
    color: "primary",
  }

  handleClick = () => {
    const {
      info,
      seatNum,
      handler,
    } = this.props
    
    handler({
      activeSeat: {
        seatNum: seatNum,
        info: info,
      }
    })
    document.form.studentID.focus()
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeSeat === undefined)
      return false

    if (this.props.activeSeat.seatNum === nextProps.activeSeat.seatNum)
      return false

    this.setState({
      active: nextProps.activeSeat.seatNum === nextProps.seatNum,
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
    roomNum: PropTypes.number.isRequired,
    strings: PropTypes.object.isRequired,
  }

  static defaultProps = {
    ...super.defaultProps,
    color: "success",
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
    color: "danger",
    disabled: true,
  }
}

// 좌석 type에 따라 다른 seat를 렌더합니다.
export default class Seat extends Component {
  static propTypes = {
    seat: PropTypes.exact({
      seatNum: PropTypes.number,
      type: PropTypes.number,
      info: PropTypes.string,
    }),
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
      strings,
      roomNum,
      activeSeat,
      handler,
    } = this.props

    const {
      seatNum,
      type,
      info,
    } = this.props.seat
    
    switch (type) {
      case 0:
        return <ReservableSeat seatNum={seatNum} info={info} activeSeat={activeSeat} handler={handler} />

      case 1:
        return <ReservedSeat seatNum={seatNum} strings={strings} roomNum={roomNum} handler={handler} />
      
      case 2:
        return <UnableSeat seatNum={seatNum} />

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