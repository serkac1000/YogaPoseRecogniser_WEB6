
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const serverApp = express();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Start express server
  serverApp.use(express.static(path.join(__dirname, 'dist/public')));
  serverApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/public/index.html'));
  });

  const server = serverApp.listen(5000, '127.0.0.1', () => {
    console.log('Server running on port 5000');
    win.loadURL('http://127.0.0.1:5000');
  });

  app.on('window-all-closed', () => {
    server.close();
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
