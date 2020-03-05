import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import React, { Component } from 'react'

import { deleteDB } from 'common/db'
import { PopupStyle } from 'common/css'
import { Password } from 'common/components'

// 예약된 좌석을 누를 시 나타나는 사용 종료 팝업입니다.
export default class EndUsePopup extends Component {
  static propTypes = {
    props: PropTypes.object.isRequired,
    trigger: PropTypes.object.isRequired,
  }

  // 학번 수집을 위해 키를 입력할 때마다 state를 업데이트합니다.
  // 엔터 키를 누르면 state에 저장된 값을 바탕으로 예약 정보 삭제를 시도합니다.
  // 삭제 실패, 성공에 따른 피드백을 줍니다.
  handleKeyPress = (event, close) => {
    if (event.key !== "Enter") {
      this.setState({
        studentID: event.target.value + event.key,
      })
      return
    }

    const {
      seat,
      handler,
    } = this.props.props

    const studentID = event.target.value

    deleteDB(studentID, seat, handler)
    event.preventDefault()
    close()
  }

  // 이용 종료 버튼을 눌렀을 때 예약 정보 삭제를 시도합니다.
  handleClick = (event, close) => {
    const {
      seat,
      handler,
    } = this.props.props

    const {
      studentID,
    } = this.state

    deleteDB(studentID, seat, handler)
    event.preventDefault()
    close()
  }

  render() {
    const {
      trigger,
    } = this.props

    const {
      endUse,
    } = this.props.props.strings

    return (
      <Popup trigger={trigger} modal>
        {close => (
          <div className={PopupStyle.modal}>
            <a className={PopupStyle.close} onClick={close}>&times;</a>
            <div className={PopupStyle.header}>{endUse.title}</div>
            <div className={PopupStyle.content}>
              <span>{endUse.text}</span>
              <Password
                placeholder={endUse.placeholder}
                onKeyPress={(event) => this.handleKeyPress(event, close)} />
            </div>
            <div className={PopupStyle.actions}>
              <Button
                block={true}
                color='danger'
                onClick={(event) => this.handleClick(event, close)}>
                {endUse.submit}
              </Button>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}