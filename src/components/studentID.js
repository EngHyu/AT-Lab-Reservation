import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { GoSearch } from 'react-icons/go'
import { getPattern } from '../db/db'
import styles from './selectSeat.module.css'

class StudentID extends Component {
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
      pattern,
    } = this.state

    return (
      <InputGroup size='lg' className={styles.studentID}>
        <InputGroupAddon addonType='prepend'>
          학번
        </InputGroupAddon>
        <Input name='studentID' pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
      </InputGroup>
    )
  }
}

class SearchID extends StudentID {
  render() {
    const {
      pattern,
    } = this.state

    return (
      <InputGroup size='lg' className={styles.studentID}>
        <InputGroupAddon addonType='prepend'>
          학번
        </InputGroupAddon>
        <Input name='studentID' pattern={pattern} title={'일치하는 사용자가 없습니다.'} required />
        <InputGroupAddon addonType='append'>
          <Button outline={true}>
            <GoSearch/>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

export { StudentID, SearchID }