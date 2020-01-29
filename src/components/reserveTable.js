import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

class TR extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    studentID: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }

  static defaultProps = {
    id: '',
    studentID: '',
    startTime: '',
    endTime: '',
  }

  render () {
    const {
      id,
      studentID,
      startTime,
      endTime
    } = this.props
    return (
      <tr>
        <td>{id}</td>
        <td>{studentID}</td>
        <td>{startTime} ~ {endTime}</td>
      </tr>
    )
  }
}

export default class ReserveTable extends Component {
  static propTypes = {
    studentList: PropTypes.array.isRequired,
  }

  static defaultProps = {
    studentList: [],
  }

  render () {
    const {
      studentList,
    } = this.props

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
            studentList.map(({studentID, startTime, endTime}, idx) => {
              return <TR key={idx} id={idx+1} studentID={studentID} startTime={startTime} endTime={endTime}/>
            })
          }
        </tbody>
      </Table>
    )
  }
}
