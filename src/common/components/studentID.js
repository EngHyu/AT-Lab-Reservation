import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { getPattern } from 'common/db'

// 학생 목록 내 학번만 입력할 수 있습니다.
// 학생 목록은 pattern으로 주어집니다.
export default class StudentID extends Component {
  static propTypes = {
    strings: PropTypes.shape({
      title: PropTypes.string.isRequired,
      alert: PropTypes.string.isRequired,
    }),
  }

  state = {
    pattern: ''
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  componentDidMount() {
    getPattern(this.handler)
  }

  render() {
    const {
      title,
      alert,
    } = this.props.strings

    const {
      pattern,
    } = this.state

    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          {title}
        </InputGroupAddon>
        <Input name='studentID' pattern={pattern} title={alert} required />
      </InputGroup>
    )
  }
}