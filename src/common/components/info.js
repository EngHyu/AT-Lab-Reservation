import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { FeedbackTitle, StudentID, SeatID } from 'common/components'

// 인적사항, 피드백, 학번과 좌석 번호를 표시합니다.
export default class Info extends Component {
  static propTypes = {
    infoFeedback: PropTypes.exact({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    strings: PropTypes.object.isRequired,
    activeNum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    handler: PropTypes.func.isRequired,
  }

  state = Info.defaultState
  
  render() {
    const {
      strings,
      activeNum,
      handler,
    } = this.props

    const {
      type,
      name,
    } = this.props.infoFeedback

    return (
      <Col md={{ size: 5, offset: 1 }}>
        <FeedbackTitle strings={strings} type={type} name={name} handler={handler} />
        <Row noGutters={true}>
          <StudentID strings={strings.studentID} />
          <SeatID strings={strings.seatID} activeNum={activeNum} />
        </Row>
      </Col>
    )
  }
}
