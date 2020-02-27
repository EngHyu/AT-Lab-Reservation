import React, { Component } from 'react'
import { Form, FormGroup, Col } from 'reactstrap'

import './App.global.css'
import * as strings from 'common/strings'
import { preprocess, reserve } from 'common/db'
import { Navigation, Title, SelectSeat, Feedback, Info, Caution } from 'common/components'

export default class App extends Component {
  state = {
    lang: 'ko',
    type: 'idle',
    name: 'idle',
    seat: [],
    roomNum: 513,
    activeNum: -1,
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    reserve(formData, this.handler)
    event.target.reset()
  }

  handleReset = () => {
    this.handler({
      activeNum: '',
    })
  }

  render() {
    const {
      lang,
      type,
      name,
      seat,
      roomNum,
      activeNum,
    } = this.state

    return (
      <div>
        <Navigation handler={this.handler} />
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} name="form" className="mt-5">
          <Title title={strings[lang].title} />
          <SelectSeat
            seat={seat}
            type={type}
            strings={strings[lang]}
            roomNum={roomNum}
            activeNum={activeNum}
            handler={this.handler} />
          <FormGroup row className="mb-5">
            <Col md={{ size: 5, offset: 1 }}>
              <Feedback strings={strings[lang]} type={type} name={name} handler={this.handler} />
              <Info strings={strings[lang]} state={this.state} handler={this.handler} />
            </Col>
          </FormGroup>
          <Caution strings={strings[lang]} />
        </Form>
      </div>
    )
  }
}