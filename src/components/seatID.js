import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

export default class SeatID extends Component {
  static propTypes = {
    seatNum: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]),
    activeNum: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }
  
  state = {
    seatID: ''
  }

  componentDidUpdate(prevProps) {
    const update = (key) => {
      if (this.props[key] !== prevProps[key]) {
        this.setState({
          seatID: this.props[key]
        })
      }  
    }
    update("seatNum")
    update("activeNum")
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