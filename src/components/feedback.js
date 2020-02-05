import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'reactstrap'

export default class Feedback extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
  }

  static defaultProps = {
    type: "idle",
    name: "idle",
  }

  state = {
    type: "idle",
    name: "idle",
  }

  componentDidUpdate(prevProps) {
    const {
      type,
      name,
    } = this.props

    if (this.props === prevProps)
      return
    
    this.setState({
      type,
      name,
    })
    setTimeout(
      ()=>{
        this.setState({
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
    } = this.props.lang

    const {
      type,
      name,
    } = this.state

    const text = feedback[type][name]

    return (
      <Row noGutters={true} className="space">
        <h4>{info}</h4>
        <span className={type}>{text}</span>
      </Row>
    )
  }
}
