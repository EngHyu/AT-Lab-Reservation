import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import React, { Component } from 'react'

import { deleteDB } from 'common/db'
import { PopupStyle } from 'common/css'
import { Password } from 'common/components'

export default class EndUsePopup extends Component {
  static propTypes = {
    props: PropTypes.object.isRequired,
    trigger: PropTypes.object.isRequired,
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
    } = this.props.props
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
    } = this.props.props

    const {
      studentID,
    } = this.state
    
    deleteDB(studentID, seatNum, roomNum, handler)
    event.preventDefault()
    close()
  }

  render() {
    const {
      trigger,
    } = this.props

    return (
      <Popup trigger={trigger} modal>
        {close => (
          <div className={PopupStyle.modal}>
            <a className={PopupStyle.close} onClick={close}>&times;</a>
            <div className={PopupStyle.header}>이용 종료</div>
            <div className={PopupStyle.content}>
              <span>언제든 재이용 할 수 있습니다.</span>
              <Password
                placeholder="이용자 학번을 입력하세요."
                onKeyPress={(event) => this.handleKeyPress(event, close)} />
            </div>
            <div className={PopupStyle.actions}>
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