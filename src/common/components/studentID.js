import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { getPattern } from 'common/db'

export default class StudentID extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
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

  // handleKeyPress = (event) => {
  //   if (event.key !== "Enter")
  //     return

  //   event.preventDefault()
  //   getReservation(
  //     event.target.value,
  //     this.props.handler
  //   )
  // }

  componentDidMount() {
    getPattern(this.handler)
  }

  render() {
    const {
      title
    } = this.props

    const {
      pattern,
    } = this.state

    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          {title}
        </InputGroupAddon>
        {/*
        <Input name='studentID' onKeyPress={this.handleKeyPress} pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
        */}
        <Input name='studentID' pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
        <InputGroupAddon addonType='append'>
          {/*
          <Button outline={true} onClick={this.handleClick}>
            <GoSearch/>
          </Button>
          */}
        </InputGroupAddon>
      </InputGroup>
    )
  }
}