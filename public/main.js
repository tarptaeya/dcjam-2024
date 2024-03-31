const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

const server = (() => {
    const server = express();
    server.use(express.static(path.resolve(__dirname)));
    return server.listen(0, () => { });
})();


const createWindow = () => {
    const window = new BrowserWindow({
        width: 1080,
        height: 720,
    });

    window.loadURL('http://localhost:' + server.address().port);
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit()
});
