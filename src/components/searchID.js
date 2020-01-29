import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup } from 'reactstrap'
import { StudentID } from '.'
import { getReservation, getReservationList } from '../db/db'

export default class SearchID extends Component {
  static propTypes = {
    handler: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { handler } = this.props
    getReservation(event.target, handler)
  }

  render () {
    return (
      <Form className="tabPanel" onSubmit={this.handleSubmit} name="searchID" >
        <FormGroup>
          <StudentID type="modify" />
        </FormGroup>
      </Form>
    )
  }
}
