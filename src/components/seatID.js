import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

export default class SeatID extends Component {
  state = {
    seatID: ''
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        seatID: this.props.value
      })
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
        [name]: value
    })
  }

  render() {
    const {
      type
    } = this.props
    
    const {
      seatID
    } = this.state

    return (
      <InputGroup size='lg'>
        <InputGroupAddon addonType='prepend'>
          좌석 번호
        </InputGroupAddon>
        <Input name='seatNum' value={seatID} onChange={this.handleChange} required />
      </InputGroup>
    )
  }
}