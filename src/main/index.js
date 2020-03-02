'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  // 화면 세팅
  // 개발 모드일 때는 크기 조절 가능, 이동 가능, 최소화 가능, 풀스크린 불가능
  // 배포 모드일 때는 크기 조절 불가능, 이동 불가능, 최소화 불가능, 풀스크린 가능
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: isDevelopment,
    movable: isDevelopment,
    minimizable: isDevelopment,
    fullscreen: !isDevelopment,
  })

  // 개발용 모니터에 띄우기 편하게 작성한 코드
  // 편하실대로 변경하셔도 됩니다.
  if (isDevelopment) {
    window.setPosition(2200, 0)
    window.setSize(1000, 1058)
  }

  // 개발 환경일때만
  // 앱 실행 시 개발자 도구 열기
  // 로컬 서버를 통해 화면 표시
  if (isDevelopment) {
    window.webContents.openDevTools()
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
