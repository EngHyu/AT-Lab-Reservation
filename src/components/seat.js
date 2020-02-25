import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Popup from 'reactjs-popup'
import { deleteDB } from '../db/db'
import { Password } from '../components'
import styles from './selectSeat.module.css'

// class BasicSeat extends Component {
//   static propTypes = {
//     seat: PropTypes.exact({
//       seatNum: PropTypes.number.isRequired,
//       type: PropTypes.number.isRequired,
//     }),
//     activeNum: PropTypes.oneOfType([
//       PropTypes.number,
//       PropTypes.string,
//     ]).isRequired,
//     handler: PropTypes.func.isRequired,
//   }

//   render() {
//     const {
//       type,
//       seatNum,
//       activeNum,
//     } = this.props

//     return (
//       <Button
//       tag='label'
//       block={true}
//       className={styles.seat}
//       color={color[type]}
//       disabled={type===2}
//       onClick={this.handleClick}
//       active={seatNum === activeNum}>
//         <Input
//         type='radio'
//         name='seatNum'
//         value={seatNum} 
//         required/>{seatNum}
//       </Button>
//     )
//   }
// }

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
      className={styles.seat}
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
    type: this.name.replace('Seat', '').toLowerCase(),
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
    type: this.name.replace('Seat', '').toLowerCase(),
    active: false,
    disabled: false,
  }

  handleKeyPress = (event, close) => {
    if (event.key !== "Enter") {
      this.setState({
        studentID: event.target.value + event.key,
      })
      return
    }

    const {
      seatNum,
      roomNum,
      handler,
    } = this.props
    const studentID = event.target.value

    deleteDB(studentID, seatNum, roomNum, handler)
    event.preventDefault()
    close()
  }

  handleClick = (event, close) => {
    const {
      seatNum,
      roomNum,
      handler,
    } = this.props

    const {
      studentID,
    } = this.state
    
    deleteDB(studentID, seatNum, roomNum, handler)
    event.preventDefault()
    close()
  }

  render() {
    return (
      <Popup trigger={super.render()} modal>
        {close => (
          <div className={styles.modal}>
            <a className={styles.close} onClick={close}>&times;</a>
            <div className={styles.header}>이용 종료</div>
            <div className={styles.content}>
              <span>언제든 재이용 할 수 있습니다.</span>
              <Password
                placeholder="이용자 학번을 입력하세요."
                onKeyPress={(event) => this.handleKeyPress(event, close)} />
            </div>
            <div className={styles.actions}>
              <Button
                block={true}
                color='danger'
                onClick={(event) => this.handleClick(event, close)}>
                좌석 이용을 종료합니다.
              </Button>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

class DangerSeat extends BasicSeat {
  static defaultProps = {
    type: this.name.replace('Seat', '').toLowerCase(),
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