const electron = require('electron');
const { BrowserWindow, app } = require('electron')
require('./index')

let mainWindow = null

function main() {
  const display = electron.screen.getPrimaryDisplay();
  const maxSize = display.workAreaSize;
  mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 760,
    resizable: true,
    height: maxSize.height,
    width: maxSize.width,
    autoHideMenuBar: true
  })
  mainWindow.loadURL(`http://localhost:8000/`, {

  })
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)