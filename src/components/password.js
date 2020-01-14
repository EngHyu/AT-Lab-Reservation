import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, ButtonToggle } from 'reactstrap';
import { GoEye, GoEyeClosed } from 'react-icons/go';

export default class Password extends Component {
  state = {
    is_show: false
  }
  
  property = [{
    icon: <GoEyeClosed />,
    type: "password"
  }, {
    icon: <GoEye />,
    type: "text"
  }]

  handleClick = (event) => {
    const {
      is_show
    } = this.state;
    this.setState({
      is_show: !is_show
    });
  }

  render() {
    // const {
    //   type
    // } = this.props;
    const {
      is_show
    } = this.state;
    const {
      icon,
      type
    } = this.property[is_show+0]
    return (
      <InputGroup size="lg">
        <InputGroupAddon addonType="prepend">
          비밀번호
        </InputGroupAddon>
        <Input type={type} name="password" required />
        <InputGroupAddon addonType="append">
          <ButtonToggle outline={true} onClick={this.handleClick} active={is_show}>
            {icon}
          </ButtonToggle>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}