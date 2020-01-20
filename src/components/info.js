import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { StudentID, SeatID, SelectTime, Password } from '../components';

export default class Info extends Component {
  state = {
    seat_num: "",
    start_time: "",
    end_time: "",
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.props;
    if (state === undefined) return;
    
    const { st_id } = state;
    const prev_st_id = prevProps.state.st_id;
    
    if (st_id === prev_st_id) return;
    this.setState(state);
  }

  render() {
    const {
      type
    } = this.props;

    const {
      seat_num,
      start_time,
      end_time
    } = this.state;

    const input = {
      "input": <StudentID type={type} />,
      "modify": <SeatID value={seat_num} />,
    }

    return (
      <Row noGutters={true}>
        { input[type] }
        <SelectTime type="start" value={start_time} />
        <SelectTime type="end" value={end_time} />
        <Password type={type} />
      </Row>
    );
  }
}