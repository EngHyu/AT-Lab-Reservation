import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { FeedbackStyle } from 'common/css'

export default class Feedback extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    strings: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: "idle",
    name: "idle",
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      handler,
    } = this.props

    if (name === prevProps["name"])
      return

    setTimeout(
      ()=>{
        handler({
          type: 'idle',
          name: 'idle',
        })
      },
      3000
    )
  }

  render() {
    const {
      info,
      feedback,
    } = this.props.strings

    const {
      type,
      name,
    } = this.props

    const text = feedback[type][name]

    return (
      <Row noGutters={true} className={FeedbackStyle.space}>
        <h4>{info}</h4>
        <span className={FeedbackStyle[type]}>{text}</span>
      </Row>
    )
  }
}
