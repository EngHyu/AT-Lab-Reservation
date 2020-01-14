import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import StudentID from './student_id';
import { getReservation } from '../db/db';

export default class SearchID extends Component {
  handleSubmit = (event) => {
    const {
      handler
    } = this.props;
    event.preventDefault();
    getReservation(search_id, handler);
  }

  render() {
    return (
      <Form className="tab__panel" onSubmit={this.handleSubmit} name="search_id" >
        <FormGroup>
          <StudentID type="modify" />
        </FormGroup>
      </Form>
    );
  }
}