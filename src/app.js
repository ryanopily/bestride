'use strict';

require('@electron/remote/main').initialize()

require('electron-reload')(__dirname);

const electron = require('electron');
const { app, BrowserWindow } = electron;

const path = require('path');

function createWindow() {
    let window = new BrowserWindow(
        {
            width: 512,
            height: 512,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            },

            backgroundColor: "red"//"#242059"
        });

    window.loadFile(path.join(__dirname, "web", "index.html"));
}

app.on('ready', () => createWindow());