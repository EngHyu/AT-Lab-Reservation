import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { FeedbackStyle } from 'common/css'

// size에 따라 h1 ~ h6을 반환합니다.
// 내용은 text로 채워집니다.
class Headers extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    text: PropTypes.string,
  }

  render() {
    const {
      size,
      text,
    } = this.props

    switch (size) {
      case 1:
        return <h1>{text}</h1>
      case 2:
        return <h2>{text}</h2>
      case 3:
        return <h3>{text}</h3>
      case 4:
        return <h4>{text}</h4>
      case 5:
        return <h5>{text}</h5>
      case 6:
        return <h6>{text}</h6>
      default:
        return <h2>{text}</h2>
    }
  }
}

// title에 사용됩니다.
// md는 bootstrap 속성이므로 건드릴 경우 레이아웃이 이상해질 수 있습니다.
// 특정 해상도에서만 사용할 것이기 때문에 md만 지정하였습니다.
// Title의 size는 h2로 고정입니다.
export class Title extends Component {
  static propTypes = {
    md: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    text: PropTypes.string,
  }

  static defaultProps = {
    md: {
      size: 10,
      offset: 1,
    },
    size: 2,
  }

  // className과 span은 FeedbackTitle 확장을 위한 변수입니다.
  render(className, span) {
    const {
      md,
      size,
      text,
    } = this.props

    return (
      <Row noGutters={true}>
        <Col md={md} className={FeedbackStyle.space}>
          <Headers size={size} text={text} />
          <span className={className}>{span}</span>
        </Col>
      </Row>
    )
  }
}

// 피드백이 있는 타이틀입니다.
// type과 name에 따라 피드백이 변화합니다.
// 피드백은 3초 후에 원래대로 돌아갑니다.
export class FeedbackTitle extends Title {
  static propTypes = {
    ...super.propTypes,

    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    strings: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    md: {
      size: 12,
      offset: 0,
    },
    size: 4,

    type: "idle",
    name: "idle",
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      handler,
    } = this.props

    if (name === prevProps.name)
      return

    setTimeout(
      ()=>{
        handler({
          infoFeedback: {
            type: 'idle',
            name: 'idle',
          }
        })
      },
      3000
    )
  }

  render() {
    const {
      feedback,
    } = this.props.strings

    const {
      type,
      name,
    } = this.props

    const span = feedback[type][name]
    const className = FeedbackStyle[type]

    return super.render(className, span)
  }
}