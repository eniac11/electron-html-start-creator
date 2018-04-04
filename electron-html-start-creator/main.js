const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs-extra');


const {app, BrowserWindow, Menu, ipcMain, globalShortcut, dialog} = electron;

var filePath;
var options;
let mainWindow;
let electronSimple;
let electronSimpleSave;

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol:'file:',
        slashes: true
    }));
	const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
  Menu.setApplicationMenu(mainMenu);
  globalShortcut.register(process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', () => {
    app.quit()
  });
  globalShortcut.register(process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', () => {
    electronSimpleSave.webContents.toggleDevTools()
  });
});

function createElectronSimple(){
    electronSimple = new BrowserWindow({
    width: 400,
    height: 300,
    title:'Electron Basic',
    parent: mainWindow
  });
  electronSimple.loadURL(url.format({
    pathname: path.join(__dirname, 'electronSimple.html'),
    protocol: 'file:',
    slashes: true
  }));
  // electronSimpleWin.setMenu(null);
  return electronSimple;
};
function createElectronSimpleSave(){
  electronSimpleSave = new BrowserWindow({
    width: 400,
    height: 30,
    title: 'Electron Save',
    parent: electronSimple,
    parent:mainWindow
  });
  electronSimpleSave.loadURL(url.format({
    pathname: path.join(__dirname, 'electronSimpleSave.html'),
    protocol: 'file:',
    slashes: true
  }));
  electronSimpleSave.setMenu(null);
  return electronSimpleSave;
};

function electronSimpleFileLayout(ops, savePath){
  for (var i = 0; i < ops.length; i++) {
    if (ops[i] == 'on'){
      console.log('template/package.json', savePath/*, (err) => {if (err) throw err; console.log('Copied');}*/);
    }

    if (ops[i] == 'main') {
      console.log('template/main.js', savePath);
    }

    if (ops[i] == 'index') {
      console.log('template/index.js', savePath);
    }

    if (ops[i] == 'indexh'){
      console.log('template/index.html', savePath);
    }

    if (ops[i] == 'mainh') {
      console.log('template/main.html', savePath);
    }
  };
};
// mainWindow.webContents.send();

function closeAll(close) {
  close.close();
}
ipcMain.on('electron:simple', function(){
  createElectronSimple();
});

ipcMain.on('electron:simpleOk', function(e, item){
  console.log(item);
  options = item;
  createElectronSimpleSave();
});

ipcMain.on('electron:simpleSave', function(e, item){
  filePath = item;
  closeAll(electronSimple);
  electronSimpleSave.close();
  electronSimpleFileLayout(options, item);
});

ipcMain.on('electron:simpleBrowse', function(e) {
  filePath = dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections', 'createDirectory']});
  e.sender.send('electron:simplePathLoc', filePath);
  console.log(filePath);
});

ipcMain.on('electron:simpleCancel', function(){
  electronSimple.close();
});

const mainMenuTemp = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];
