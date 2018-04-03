ipcMain.on('electron:simpleCancel', function(){
    mainWindow.webContents.send('electron:simpleCancel')
    electronSimple.close();
  });
  
  ipcMain.on('electron:simpleOkNpm', function(e, item){
    NPM = item;
    console.log(item);
    mainWindow.send('electron:simpleOkNpm', item);
  });
  
  ipcMain.on('electron:simpleOkPoe', function(e, item){
    POE = item;
    console.log(item);
    mainWindow.webContents.send('electron:simpleOkPoe', item);
  });
  
  ipcMain.on('electron:simpleOkOps', function(e, item){
    OPS = item;
    console.log(item);
    mainWindow.send('electron:simpleOkOps', item);
  });