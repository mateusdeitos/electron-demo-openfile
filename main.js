const { app, BrowserWindow, dialog, ipcMain } = require('electron')
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')
}

app.on('ready', () => {
    createWindow();
    ipcMain.on('open-file-dialog', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections']
        }).then(files => {
            if (files) {
                event.sender.send('selected-files', files);
            }
        })
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})