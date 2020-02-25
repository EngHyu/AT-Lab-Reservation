import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Col } from 'reactstrap'
import { Title, SelectSeat, Feedback, Info, Caution } from '../components'
import { preprocess, reserve, modify, deleteDB, getSeat } from '../db/db'

export default class General extends Component {
  static propTypes = {
    strings: PropTypes.object.isRequired,
  }

  state = {
    type: 'idle',
    name: 'idle',
    seat: [],
    roomNum: 513,
    activeNum: -1,
  }

  submit = reserve
  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    this.submit(formData, this.handler)
    event.target.reset()
  }

  handleReset = () => {
    this.handler({
      activeNum: '',
    })
  }

  render() {
    const {
      strings,
    } = this.props

    const {
      type,
      name,
      seat,
      roomNum,
      activeNum,
    } = this.state
    
    return (
      <Form onSubmit={this.handleSubmit} onReset={this.handleReset} className="tabPanel mt-5">
        <Title title={strings.title} />
        <SelectSeat
          seat={seat}
          type={type}
          roomNum={roomNum}
          activeNum={activeNum}
          handler={this.handler} />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Feedback strings={strings} type={type} name={name} handler={this.handler} />
            <Info strings={strings} state={this.state} handler={this.handler} />
          </Col>
        </FormGroup>
        <Caution strings={strings} />
      </Form>
    )
  }
}