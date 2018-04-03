// In main process.
const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, dialog} = electron;

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol:'file:',
        slashes: true
    }));
    console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}));
});