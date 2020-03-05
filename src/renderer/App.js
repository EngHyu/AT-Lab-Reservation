import React, { Component } from 'react'
import { Form, FormGroup } from 'reactstrap'

import './App.global.css'
import { preprocess, reserve } from 'common/db'
import { settings, strings, Navigation, Title, Help, SelectSeat, Info, Device, Caution } from 'common/components'

export default class App extends Component {
  static defaultState = {
    lang: 'ko',    // 언어 선택용. src/static/strings 폴더 안에 있는 파일 이름 값이 들어갈 수 있습니다.
    infoFeedback: {
      type: 'idle',  // feedback 상태 [idle, valid, invalid]
      name: 'idle',  // feedback 이름 => src/static/strings/ko.json 파일 안에 나와 있습니다.
    },
  }

  // 초기 상태를 defaultState로 초기화
  // reset 될 때마다 defaultState로 초기화 합니다.
  state = {
    ...App.defaultState,
    roomNum: settings.roomNum,  // 513 or 431
    seat: [], // 좌석 정보가 { seatNum, type[예약가능=0, 예약됨=1, 고장=2], info } 형태 배열로 들어갑니다.,
    activeSeat: {
      roomNum: settings.roomNum, // 513, [431, 433, 435]
      type: 0,
      seatNum: 0,
    }
  }

  // 주로 자식 컴포넌트가 이 컴포넌트의 state를 조작할 때 사용합니다.
  // this.setState 대체용으로 봐주시면 됩니다.
  handler = (state) => {
    this.setState({
      ...this.state,
      ...state
    })
  }

  // formData를 가공한 뒤 db에 예약 정보를 insert 합니다.
  // form을 리셋합니다.
  handleSubmit = (event) => {
    event.preventDefault()
    const formData = preprocess(event.target)
    reserve(formData, this.handler)
    event.target.reset()
  }

  // form이 리셋될 때 state도 리셋합니다.
  handleReset = () => {
    const { activeSeat } = this.state
    const resetSeat = {
      ...activeSeat,
      seatNum: 0,
    }

    this.handler({
      ...this.state,
      activeSeat: resetSeat,
    })
  }

  render() {
    const {
      lang,
      seat,
      roomNum,
      activeSeat,
      infoFeedback,
    } = this.state

    const title = strings[lang].app.title + ` - ${roomNum}`
    
    return (
      <div>
        <Navigation handler={this.handler} />
        <Form onSubmit={this.handleSubmit} onReset={this.handleReset} name="form" className="mt-5">
          <Title text={title} />
          <Help strings={strings[lang].help} />
          <SelectSeat
            seat={seat}
            strings={strings[lang]}
            roomNum={roomNum}
            activeSeat={activeSeat}
            handler={this.handler} />

          <FormGroup row className="mb-5">
            <Info
              activeNum={activeSeat.seatNum}
              infoFeedback={infoFeedback}
              strings={strings[lang].info}
              handler={this.handler} />

            <Device
              roomNum={roomNum}
              activeSeat={activeSeat}
              strings={strings[lang].device} />
          </FormGroup>

          <Caution strings={strings[lang].caution} />
        </Form>
      </div>
    )
  }
}