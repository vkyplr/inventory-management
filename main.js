const { BrowserWindow, app } = require('electron')
require('./index')

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`http://localhost:8000/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)