import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'
import { feedback } from '../strings'

export default class Feedback extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    status: "idle",
  }

  state = feedback.idle

  componentDidUpdate(prevProps) {
    const {
      status,
    } = this.props
    
    if (this.props === prevProps)
      return
    
    const state = feedback[status]
    console.log(feedback);
    this.setState(state)
    setTimeout(
      ()=>{
        this.setState(feedback.idle)
      },
      3000
    )
  }

  render() {
    const {
      title,
    } = this.props

    const {
      className,
      text,
    } = this.state

    return (
      <Row noGutters={true} className="space">
        <h4>{title}</h4>
        <span className={className}>{text}</span>
      </Row>
    )
  }
}
