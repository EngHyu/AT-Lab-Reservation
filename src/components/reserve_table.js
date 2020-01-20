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
    const {
      st_list,
    } = this.props;

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
          {
            st_list.map(({st_id, start_time, end_time}, idx) => {
              return <TR key={idx} id={idx+1} st_id={st_id} start_time={start_time} end_time={end_time}/>
            })
          }
        </tbody>
      </Table>
    );
  }
}
