const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// const request = require('request');
//
// const start = Date.now();
// request('http://localhost:5000', (error, resp, body) => {
//   const end = Date.now();
//   console.log(end - start);
//   console.log(`${resp} ${body}`);
// });

const io = require('socket.io-client').connect('http://localhost:8000');

let start = Date.now();
// io.on('event', (resp) => {
//   const end = Date.now();
//   console.log(`${end - start}`);
//   console.log(resp);
// });
io.on('reply', (resp) => {
  console.log(`reply: ${resp}`)
  end = Date.now();
  console.log(`${end - start}`);
});

io.on('connect', (resp) => {
  let end = Date.now();
  console.log(`${end - start}`);
  console.log(resp);

start = Date.now();
  io.send('boop');

});




// const spawn = require('child_process').spawn;
// const Onset = spawn('python', ['onset-detection.py']);
// Onset.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
// Onset.stdout.on('end', (data) => {
//   console.log(`THE END`);
// });
//
// Onset.stdin.write('x');
// Onset.stdin.end();
