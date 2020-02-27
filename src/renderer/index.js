/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { initDB } from 'common/db'

console.log(initDB)
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)