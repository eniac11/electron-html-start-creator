const electron = require('electron');
const {ipcRenderer} = electron;

var data;

function okSubmit(){
    var NPM;
    var POE;
    var OPS;

    if (document.getElementById('npmO').checked) {
        NPM = document.getElementById('npmO').value;
        console.log(NPM);
        // ipcRenderer.send('electron:simpleOkNpm', NPM);
    }

    if (document.getElementById('npmF').checked) {
        NPM = document.getElementById('npmF').value;
        console.log(NPM);
        // ipcRenderer.send('electron:simpleOkNpm', NPM);
    }

    if (document.getElementById('POEm').checked) {
        POE = document.getElementById('POEm').value;
        console.log(POE);
        // ipcRenderer.send('electron:simpleOkPoe', POE);
    }

    if (document.getElementById('POEi').checked) {
        POE = document.getElementById('POEi').value;
        console.log(POE);
        // ipcRenderer.send('electron:simpleOkPoe', POE);
    }

    if (document.getElementById('OPSi').checked) {
        OPS = document.getElementById('OPSi').value;
        console.log(OPS);
        // ipcRenderer.send('electron:simpleOkOps', OPS);
    }

    if (document.getElementById('OPSm').checked) {
        OPS = document.getElementById('OPSm').value;
        console.log(OPS);
        // ipcRenderer.send('electron:simpleOkOps', OPS);
    }
    
    data = [NPM, POE, OPS];

    ipcRenderer.send('electron:simpleOk', data);

};

function cancelSubmit(){

    ipcRenderer.send('electron:simpleCancel');
}