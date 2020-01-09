import React, { Component } from 'react';
import ReserveSeat from '../containers/reserve_seat';
import ModifyReserve from '../containers/modify_reserve';
import EndUse from '../containers/end_use';
import './App.global.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <ReserveSeat/>
        <ModifyReserve/>
        <EndUse/>
      </div>
    );
  }
}