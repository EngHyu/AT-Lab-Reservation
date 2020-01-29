import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input, ButtonToggle } from 'reactstrap'
import { GoEye, GoEyeClosed } from 'react-icons/go'

export default class Password extends Component {
  state = {
    isShow: false
  }
  
  property = [{
    icon: <GoEyeClosed />,
    type: 'password'
  }, {
    icon: <GoEye />,
    type: 'text'
  }]

  handleClick = () => {
    const {
      isShow
    } = this.state
    this.setState({
      isShow: !isShow
    })
  }

  render() {
    const {
      isShow
    } = this.state
    const {
      icon,
      type
    } = this.property[isShow+0]
    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          비밀번호
        </InputGroupAddon>
        <Input type={type} name='password' required />
        <InputGroupAddon addonType='append'>
          <ButtonToggle outline={true} onClick={this.handleClick} active={isShow}>
            {icon}
          </ButtonToggle>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}