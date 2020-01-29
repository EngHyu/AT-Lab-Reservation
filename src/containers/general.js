import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Col, Row } from 'reactstrap'
import { Title, SelectSeat, Feedback, StudentID, /*SeatID, SelectTime, Password,*/ Info, Caution } from '../components'
import { preprocess, reserve, modify, /*initDB*/ } from '../db/db'
import styles from '../components/selectSeat.module.css'
import * as ko from '../strings/ko.json'

class General extends Component {
  static propTypes = {
    floor: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    floor: 4,
    lang: ko.default,
    type: "input",
  }

  state = {
    status: "idle",
    activeNum: -1,
  }

  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  render() {
    // initDB()
    const {
      floor,
      mode,
      lang,
      type,
    } = this.props

    const {
      status,
      activeNum,
    } = this.state
    
    return (
      <Form className="tabPanel mt-5" name="reserve_seat" onSubmit={this.handleSubmit}>
        <Title  title={lang[mode].title} />
        <SelectSeat mode={mode} handler={this.handler} />
        <FormGroup row className="mb-5">
          <Col md={{ size: 5, offset: 1 }}>
            <Feedback title={lang.info} status={status} />

            <Row noGutters={true} className={styles.studentID}>
              <StudentID type={type} />
            </Row>
      
            <Info type={type} seatNum={activeNum} floor={floor} />
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

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    reserve(formData, this.handler)
  }
}

class Modify extends General {
  static defaultProps = {
    ...super.defaultProps,
    mode: this.name.toLowerCase(),
    type: "modify",
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    modify(formData, this.handler)
  }
}

class End extends General {
  static defaultProps = {
    ...super.defaultProps,
    mode: this.name.toLowerCase(),
    type: "modify",
  }
}

export default { Reserve, Modify, End }