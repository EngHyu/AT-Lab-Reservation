/* eslint-disable no-undef */
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { initDB, insertDummyData } from 'common/db'

// initDB()
// insertDummyData()
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)