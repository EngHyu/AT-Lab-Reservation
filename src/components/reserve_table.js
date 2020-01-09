import React, { Component } from 'react';
import { Table } from 'reactstrap';

class TR extends Component {
  render() {
    const {
      id,
      st_id,
      start_time,
      end_time
    } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{st_id}</td>
        <td>{start_time} ~ {end_time}</td>
      </tr>
    );
  }
}

export default class ReserveTable extends Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>학번</th>
            <th>시간</th>
          </tr>
        </thead>
        <tbody>
          <TR id={1} st_id={20161180} start_time="09:00" end_time="12:00"/>
        </tbody>
      </Table>
    );
  }
}
