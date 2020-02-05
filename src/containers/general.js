import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Col } from 'reactstrap'
import { Title, SelectSeat, Feedback, /*SeatID, SelectTime, Password,*/ Info, Caution } from '../components'
import { preprocess, reserve, modify, deleteDB, initDB } from '../db/db'
import * as ko from '../strings/ko.json'

class General extends Component {
  static propTypes = {
    floor: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
  }

  static defaultProps = {
    floor: 4,
    lang: ko.default,
  }

  state = {
    status: "idle",
    activeNum: -1,
    key: 0,
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
    this.submit(formData, this.handler)
    event.target.reset()
  }

  handleReset = () => {
    this.handler({
      key: this.state.key+1,
    })
  }

  render() {
    // initDB()
    const {
      floor,
      mode,
      lang,
    } = this.props

    const {
      key,
      type,
      name,
    } = this.state
    
    return (
      <Form key={key} onSubmit={this.handleSubmit} onReset={this.handleReset} name={mode} className="tabPanel mt-5">
        <Title  title={lang[mode].title} />
        <SelectSeat mode={mode} handler={this.handler} />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Feedback lang={lang} type={type} name={name} />
            <Info mode={mode} state={this.state} floor={floor} handler={this.handler} />
          </Col>
          <Caution lang={lang[mode]} />
        </FormGroup>
      </Form>
    )
  }
}

class Reserve extends General {
  static defaultProps = {
    ...super.defaultProps,
    mode: this.name.toLowerCase(),
  }

  constructor(props) {
    super(props)
    this.submit = reserve
  }
}

class Modify extends General {
  static defaultProps = {
    ...super.defaultProps,
    mode: this.name.toLowerCase(),
  }

  constructor(props) {
    super(props)
    this.submit = modify
  }
}

class End extends General {
  static defaultProps = {
    ...super.defaultProps,
    mode: this.name.toLowerCase(),
  }

  constructor(props) {
    super(props)
    this.submit = deleteDB
  }
}

export { Reserve, Modify, End }