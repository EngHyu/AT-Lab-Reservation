/* eslint-disable no-undef */
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
// import { initDB, insertDummyUser } from 'common/db'

// initDB() // for initial table
// insertDummyUser() // for test
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)