import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { StudentID } from '../components';
import { getReservation, getReservationList } from '../db/db';

export default class SearchID extends Component {
  handleSubmit = (event) => {
    const {
      handler
    } = this.props;
    event.preventDefault();
    getReservation(event.target, handler);
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