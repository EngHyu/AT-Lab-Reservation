import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { GoSearch } from 'react-icons/go'
import { getPattern, getReservation } from '../db/db'
import styles from './selectSeat.module.css'

class DisplayID extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
      title
    } = this.props

    const {
      pattern,
    } = this.state

    return (
      <InputGroup size='lg' className={styles.studentID}>
        <InputGroupAddon addonType='prepend'>
          {title}
        </InputGroupAddon>
        <Input name='studentID' pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
      </InputGroup>
    )
  }
}

class SearchID extends DisplayID {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  }

  handleKeyPress = (event) => {
    if (event.key !== "Enter")
      return

    event.preventDefault()
    getReservation(
      event.target.value,
      this.props.handler
    )
  }

  render() {
    const {
      title
    } = this.props

    const {
      pattern,
    } = this.state

    return (
      <InputGroup size='lg' className={styles.studentID}>
        <InputGroupAddon addonType='prepend'>
          {title}
        </InputGroupAddon>
        <Input name='studentID' onKeyPress={this.handleKeyPress} pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
        <InputGroupAddon addonType='append'>
          <Button outline={true} onClick={this.handleClick}>
            <GoSearch/>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

export default class StudentID extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  }

  render() {
    const {
      title,
      mode,
      handler,
    } = this.props

    return (
      mode === "reserve" ?
      <DisplayID title={title} /> :
      <SearchID title={title} handler={handler} />
    )
  }
}