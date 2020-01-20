import React, { Component } from 'react';

export default class Feedback extends Component {
  type = {
    idle: {
      className: "idle",
      text: "",
    },
    reserve_success: {
      className: "valid",
      text: "* 예약을 완료했습니다.",
    },
    reserve_failed: {
      className: "invalid",
      text: "* 이미 예약하셨습니다.",
    },
    select_success: {
      className: "valid",
      text: "* 예약 정보를 불러왔습니다.",
    },
    select_failed: {
      className: "invalid",
      text: "* 예약 정보가 없습니다.",
    },
    modify_success: {
      className: "valid",
      text: "* 예약을 수정하였습니다.",
    },
    delete_success: {
      className: "valid",
      text: "* 예약 정보를 삭제했습니다.",
    },
    verify_failed: {
      className: "invalid",
      text: "* 비밀번호가 다릅니다.",
    },
  }

  state = this.type["idle"];

  componentDidUpdate(prevProps, prevState) {
    const {
      status,
    } = this.props;

    if (this.props === prevProps)
      return;
    
    const state = this.type[status];
    this.setState(state);
    setTimeout(
      ()=>this.setState(this.type.idle),
      3000
    );
  }

  render() {
    const {
      className,
      text,
    } = this.state;

    return (
      <span className={className}>
        {text}
      </span>
    );
  }
}
