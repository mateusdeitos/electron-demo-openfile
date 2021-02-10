const { ipcRenderer } = require('electron');
const filesBtn = document.getElementById('open-dialog-file')
const $tableBody = document.querySelectorAll('.results .table-results tbody').item(0);

filesBtn.addEventListener('click', (event) => {
    ipcRenderer.send('open-file-dialog')
})
ipcRenderer.on('selected-files', (event, files) => {
    showFiles(files);
})


function showFiles(files) {
    files?.filePaths.map(path => {
        const $tr = document.createElement('tr');
        const $td = document.createElement('td');
        $td.textContent = path;
        $tr.appendChild($td);
        $tableBody.appendChild($tr);
    })
}