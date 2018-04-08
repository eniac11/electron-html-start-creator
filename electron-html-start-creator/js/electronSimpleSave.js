const electron = require('electron');
const {ipcRenderer, dialog} = electron;
var filePath;
var folderPath;

ipcRenderer.on('electron:simplePathLoc', function(e, item) {
    folderPath = document.querySelector('#save').value = item;
    return folderPath;
});

function browse(){
    ipcRenderer.send('electron:simpleBrowse');
};

function save(){
    folderPath = document.querySelector('#save').value;
    
    console.log(folderPath)
    ipcRenderer.send('electron:simpleSave', folderPath);
};

