import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

// SeatID는 activeNum을 받아 input에 표시합니다.
// 이외의 방법으로는 input을 수정할 수 없습니다.
export default class SeatID extends Component {
  static propTypes = {
    strings: PropTypes.shape({
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    activeNum: PropTypes.number.isRequired,
  }

  render() {
    const {
      activeNum,
    } = this.props

    const {
      title,
      placeholder,
    } = this.props.strings
    
    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          {title}
        </InputGroupAddon>
        <Input name='seatNum' value={activeNum > 0 ? activeNum : ''} placeholder={placeholder} readOnly required />
      </InputGroup>
    )
  }
}