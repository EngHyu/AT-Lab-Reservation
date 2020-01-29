import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { GoSearch } from 'react-icons/go'
import { getPattern } from '../db/db'

class Search extends Component {
  render() {
    return (
      <InputGroupAddon addonType='append'>
        <Button outline={true}>
          <GoSearch/>
        </Button>
      </InputGroupAddon>
    )
  }
}

export default class StudentID extends Component {
  state = {
    pattern: ''
  }

  static propTypes = {
    type: PropTypes.string.isRequired
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
    const { type } = this.props
    const { pattern } = this.state
    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          학번
        </InputGroupAddon>
        <Input name='studentID' pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
        {type === 'input' ? null : <Search />}
      </InputGroup>
    )
  }
}