
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

  // Serve static files from root directory
  serverApp.use(express.static(__dirname));
  
  // Serve index.html for all routes
  serverApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  const server = serverApp.listen(5000, '0.0.0.0', () => {
    console.log('Server running on port 5000');
    win.loadURL('http://localhost:5000');
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
