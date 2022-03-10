  const electron = require('electron')
  const {app, BrowserWindow} = electron
  const path = require('path')
  const url = require('url')
  const wstate = require('electron-window-state');

  
  // Mantén una referencia global del objeto ventana, si no lo haces, la ventana se
  // cerrará automáticamente cuando el objeto de JavaScript sea basura colleccionada.
  let win
  
  function createWindow () {

    // Load the previous state with fallback to defaults
    let windowState = wstate({
      defaultWidth: 486,
      defaultHeight: Math.floor(electron.screen.getPrimaryDisplay().workAreaSize.height * 0.85)
    });

    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    //console.log({width,height})
    
    win = new BrowserWindow({
        width: windowState.width,
        height: windowState.height,
        x: windowState.x,
        y: windowState.y,
        show: true,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        resizable: true,
        enableLargerThanScreen: false,
        //icon: path.join(__dirname, 'ico/png/64x64.png'),
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        }
    })

    //win.setIgnoreMouseEvents(true);
    //win.setFocusable(false);
    win.setAspectRatio(2.1);
    
    windowState.manage(win);

  
    // y carga el archivo index.html de la aplicación.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  
    // Abre las herramientas de desarrollo.
    //ESTO PARA DEBUG!!
    //win.webContents.openDevTools()
  
    // Emitido cuando la ventana es cerrada.
    win.on('closed', () => {
      console.log("on closed");
      // Desreferencia el objeto ventana, usualmente tu guardarias ventanas
      // en un arreglo si tu aplicación soporta multi ventanas, este es el momento
      // cuando tu deberías borrar el elemento correspiente.
      win = null
    })
  }
  
  // Este método será llamado cuando Electron haya terminado
  // la inicialización y esté listo para crear ventanas del navegador.
  // Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
  app.on('ready', createWindow)
  
  // Salir cuando todas las ventanas estén cerradas.
  app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
    console.log("on window-all-closed");
    app.quit(); //esto lo pongo asi en vez de como aconsejan porque yo quiero que se cierre incluso en mac
    /*
    if (process.platform !== 'darwin') {
      app.quit()
    }
    */
  })
  
  app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clickeado y no hay otras ventanas abieras.
    if (win === null) {
      createWindow();
    }
  })
  
  // En este archivo tu puedes incluir el resto del código del proceso principal de
  // tu aplicación. Tu también puedes ponerlos en archivos separados y requerirlos aquí.