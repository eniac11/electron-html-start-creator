const electron = require('electron');
const {ipcRenderer} = electron;

// document.querySelector('#electron').addEventListener('simplElectron', simplElectronSubmit);
// document.querySelector('#electron').addEventListener('startElectron', startElectronSubmit);

function simplElectronSubmit(){
    const item = document.querySelector('#simplElectron').value;
    console.log(item);
    console.log(ipcRenderer);
    ipcRenderer.send('electron:simple', item);
};

function startElectronSubmit(){
    const item = document.querySelector('#startElectron').value;
    console.log(ipcRenderer);
    ipcRenderer.send('electron:start', item);
}

ipcRenderer.on('electron:simpleCancel', function(){
    const itemText = 'Cancel';
    const text = document.querySelector('#callbacks');
    text.append(itemText);
});

ipcRenderer.on('electron:simpleOkNpm', function(item){
    const text = document.querySelector('#callbacks');
    console.log(item);
    text.append(item);
});

ipcRenderer.on('electron:simpleOkPoe', function(item){
    const text = document.querySelector('#callbacks');
    console.log(item)
    text.append(item);
});

ipcRenderer.on('electron:simpleOkOps', function(item){
    const text = document.querySelector('#callbacks');
    console.log(item)
    text.append(item);
});