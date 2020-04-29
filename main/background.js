import { app } from 'electron';
import serve from 'electron-serve';
import {
  createWindow,
  exitOnChange,
} from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  exitOnChange();
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
  });

  mainWindow.setSize(800, 500, false);
  mainWindow.setResizable(false);
  mainWindow.setMinimizable(false);
  mainWindow.setFullScreenable(false);

  if (isProd) {
    await mainWindow.loadURL('app://./');
    mainWindow.setMenu(null);
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    //mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
