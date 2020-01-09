import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';

export default class Caution extends Component {
  render() {
    return (
      <Col md={{ size: 5 }}>
        <h4>주의사항</h4>
        <ol>
          <li>본 실습실은 A&T 주전공, 복수전공인 학생만 사용 가능합니다.</li>
          <li>일회용 비밀번호는 좌석 예약 취소, 변경, 사용 종료 시에 사용됩니다.</li>
          <li>X513 개방 시간은 09:00부터 23:00까지입니다.</li>
          <li>시험 기간에는 24시간 개방합니다.(별도 공지 예정)</li>
        </ol>
        <Button color="primary" block={true}>주의사항에 동의하며 예약을 진행합니다.</Button>
      </Col>
    );
  }
}