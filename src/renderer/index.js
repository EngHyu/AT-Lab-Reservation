import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initDB } from '../db/db'

// initDB()
const rootElement = document.getElementById('app')
ReactDOM.render(<App />, rootElement)
